/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.proyecto2backend;

import static java.lang.System.in;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import model.DAO.General.GeneralHandler;
import model.Medico;
import model.Usuario;
import model.Horario;
import model.ModelMedicosRest;
import model.serviceBackend.Service;

/**
 *
 */


//password,especialidad, fee, localidad, clinica, fotoPath, presentacion, estado, nombre,id, tipo


@Path("/medicos")
public class Medicos {
     //ModelMedicosRest model = new ModelMedicosRest();
     
     @Context
     HttpServletRequest request;
     
    @GET
    @Produces(MediaType.APPLICATION_JSON)//se coloca produces porque el metodo devuelve datos (en este caos una lista de personas)
    public List<Medico> read(){
        return Service.instance().retornarListaMedicos();
    }
    
    
    
    //GET/ID
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Medico read(@PathParam("id") String id){
       return Service.instance().retornarMedicoPorID(id);
    }
    
    
    //Actualiza la informacion de todo el medico
   //backend+'/medicos/'+medico.cedula/+'/'+estado,  {method: 'PUT', headers: { 'Content-Type': 'application/json'},  body: JSON.stringify(persona)});
    @PUT
    @Path("{id}/{estado}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(@PathParam("id") String id, @PathParam("estado") String estado) {  
        try {
        Service.instance().cambiarEstadoMedico(id, estado);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    //DELETE/ID
    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") String id){
       try {
            
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }
    
    
    
}
