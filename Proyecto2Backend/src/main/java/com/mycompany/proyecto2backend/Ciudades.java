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

/**
 *
 * @author norma
 */
@Path("/ciudades")
public class Ciudades {
    
    ArrayList<Ciudad> ciudades = new ArrayList();
    void cargarDatos(){
        ciudades.add(new Ciudad("1", "San Jose", "San Jose"));
        ciudades.add(new Ciudad("2", "San Pedro", "San Jose"));
        ciudades.add(new Ciudad("3", "San Barva", "Heredia"));
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Ciudad> read(){
        cargarDatos();
        return ciudades;
    }
    
    
    @GET
    @Path("{codigo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Ciudad read(@PathParam("codigo") String id) {
        cargarDatos();
        try {
            for (Ciudad city : ciudades) {
                if (city.getCodigo().equals(id)) {
                    return city;
                }
            }
        } catch (Exception e) {
            throw new NotFoundException();
        }

        return null;
    }
    
}
