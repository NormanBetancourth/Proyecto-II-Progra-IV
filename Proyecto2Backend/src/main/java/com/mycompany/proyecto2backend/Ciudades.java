/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.proyecto2backend;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.PathParam;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import model.Ciudad;
import model.Especialidad;
import model.serviceBackend.Service;

/**
 *
 * @author norma
 */
@Path("/ciudades")
public class Ciudades {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Ciudad> read() {
        try {
            return Service.instance().retornarListaCiudades();
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    //Obtener una especialidad  "backend/especialidades/codigoEspecialidad"
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Ciudad read(@PathParam("codigo") String codigo) {
        try {
            return Service.instance().retornarCiudad(codigo);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
    
}
