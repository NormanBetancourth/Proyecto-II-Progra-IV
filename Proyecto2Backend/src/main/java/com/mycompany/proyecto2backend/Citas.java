/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/WebServices/GenericResource.java to edit this template
 */
package com.mycompany.proyecto2backend;

import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import model.Cita;
import model.Medico;
import model.Usuario;
import model.serviceBackend.Service;

/**
 * REST Web Service
 *
 * @author Dell
 */
@Path("citas")
@RequestScoped
public class Citas {

    @Context
    HttpServletRequest request;

    Usuario getCurrentMed() {
        HttpSession session = request.getSession(true);
        Usuario m = (Usuario) session.getAttribute("user");
        return m;
    }


    //Registrar una cita en la BD
    // REQUEST QUE SE ENVIA EN LA PETICION:                                                                                              
    // const request = new Request(backend+'/citas,  {method: 'PUT', headers: { 'Content-Type': 'application/json'},  body: JSON.stringify(CITA)});
    //@RolesAllowed({"Medico", "Usuario"}) 
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Cita c) {
        try {
            System.out.println(c);
            Service.instance().registrarCitaMedicoPaciente(c); //la clase de servicio invoca al metodo que creara una persona
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotAcceptableException();
        }
    }
    
    @POST
    @Path("/atender")
    @Consumes(MediaType.APPLICATION_JSON)
    public void atender(Cita c) {
        try {
            System.out.println(c);
            Service.instance().atenderCita(c);
            
            
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotAcceptableException();
        }
    }
    
    @POST
    @Path("/cancelar/{numero}")
    public void cancelar(@PathParam("numero") String numero) {
        try {
            System.out.println(numero);
            Service.instance().modificarEstadoCita(numero, "Cancelado"); 
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotAcceptableException();
        }
    }
    
    @POST
    @Path("/fix")
    @Consumes(MediaType.APPLICATION_JSON)
    public void create2(Cita c) {
        try {
            System.out.println(c);
            Service.instance().registrarCitaMedicoPaciente2(c); //la clase de servicio invoca al metodo que creara una persona
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotAcceptableException();
        }
    }

    //Obtener la lista de citas por dia
    // REQUEST QUE SE ENVIA EN LA PETICION:                                                                                              
    // const request = new Request(backend+'/citas/2022-10-09,  {method: 'GET', headers: {));
    @GET
    @Path("{fecha}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Cita> read(@PathParam("fecha") String fecha) {
        System.out.println(fecha);
        try {
            List<Cita> lista = Service.instance().retornarListaDeCitaPorDia(this.getCurrentMed().getId(), fecha);
            return lista;
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotFoundException();
            
        }
    }
    
    @GET
    @Path("paciente/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Cita> readPorPacientes(@PathParam("id") String id) {
        System.out.println(id);
        try {
            List<Cita> lista = Service.instance().retornarListaDeCitaPorPaciente(this.getCurrentMed().getId(), id);
            return lista;
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotFoundException();

        }
    }

    //Actualizar el estado de una cita (solo el admin puede acceder a este metodo)
    @PUT
    @Path("{codigo}/{estado}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateEstadoMedico(@PathParam("codigo") String codigo, @PathParam("estado") String estado) {  
        try {
        Service.instance().modificarEstadoCita(codigo, estado);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
}
