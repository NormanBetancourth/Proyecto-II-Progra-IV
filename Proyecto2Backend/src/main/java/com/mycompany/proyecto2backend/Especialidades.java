/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.proyecto2backend;

import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import model.Ciudad;
import model.Especialidad;

/**
 *
 * @author norma
 */
@Path("/especialidades")
public class Especialidades {
    ArrayList<Especialidad> especialidades= new ArrayList();
    
    public void cargarDatos(){
        especialidades.add(new Especialidad("1", "Cirugia", "Operar"));
        especialidades.add(new Especialidad("2", "Pediatria", "Atender ninos"));
        especialidades.add(new Especialidad("3", "xyz", "desc xyz"));
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Especialidad> read(){
        cargarDatos();
        return especialidades;
    }
    
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Especialidad read(@PathParam("codigo") String id) {
        cargarDatos();
        try {
            for (Especialidad esp : especialidades) {
                if (esp.getCodigo().equals(id)) {
                    return esp;
                }
            }
        } catch (Exception e) {
            throw new NotFoundException();
        }

        return null;
    }
    
}
