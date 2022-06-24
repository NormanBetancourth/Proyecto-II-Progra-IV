/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.proyecto2backend;

import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import model.Medico;
import model.Paciente;
import model.Usuario;
import model.serviceBackend.Service;

/**
 * REST Web Service
 *
 * @author Dell
 */
@Path("pacientes")
@RequestScoped
public class Pacientes {
    @Context
    HttpServletRequest request;

    Usuario getCurrentMed() {
        HttpSession session = request.getSession(true);
        Usuario m = (Usuario) session.getAttribute("user");
        return m;
    }

    //Registrar un paciente en la BD
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void create(Paciente p) {  
        try {
            Service.instance().registrarPaciente(p); //la clase de servicio invoca al metodo que creara una persona
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    
   //Obtener la lista de pacientes segun el id de un medico
    @GET
    @Path("{idMed}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Paciente> readListPatients(@PathParam("idMed") String idMed){
        System.out.println(idMed);
        try {
           return Service.instance().retornarListaPacientesIdMed(idMed);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Paciente> readListPatients2(){
        try {
           return Service.instance().retornarListaPacientesIdMed(this.getCurrentMed().getId());
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    //Obtener un paciente
    @GET
    @Path("data/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Paciente readPatients(@PathParam("id") String id){
        try {
           return Service.instance().retornarPaciente(id);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
    
    //Actualizar la informacion de un paciente (solo enviar la peticion PUT junto al objeto paciente (ojo que de ese objeto no se puede modificar el id del medico, ni del paciente)
    //Solo se modifica el telefono y el nombre del paciente
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateMedico(Paciente p) {
        try {
            Service.instance().modificarPaciente(p);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
    
    //Borrar un paciente en la DB
    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") String id){
       try {
            Service.instance().borrarPacientePorId(id);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }
}
