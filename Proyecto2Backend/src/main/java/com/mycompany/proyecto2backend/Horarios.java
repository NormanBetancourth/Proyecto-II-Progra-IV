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
 * @author norma
 */
@Path("/horarios")
public class Horarios {
    
    @Context
    HttpServletRequest request;
    
    Medico getCurrentMed(){
        HttpSession session = request.getSession(true);
        Medico m = (Medico) session.getAttribute("user");
        return m;
    }

    //Registrar el horario de el medico
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Horario h) {
        try {
            System.out.println(h);
            //TODO: en espera del metodo de Hector
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }

    //Obtener el horario completo de un médico
    @GET
    @Produces(MediaType.APPLICATION_JSON)//se coloca produces porque el metodo devuelve datos (en este caos una lista de personas)
    public List<Horario> read() {
        try {
            return Service.instance().retornarHorariosActivos(this.getCurrentMed().getId());
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

//    //Obtener un medico
//    @GET
//    @Path("{id}")
//    @Produces({MediaType.APPLICATION_JSON})
//    public Medico read(@PathParam("id") String id) {
//        try {
//            return Service.instance().retornarMedicoPorID(id);
//        } catch (Exception ex) {
//            throw new NotFoundException();
//        }
//    }
//
//    //Actualizar el estado de un medico
//    @PUT
//    @Path("{id}/{estado}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void updateEstadoMedico(@PathParam("id") String id, @PathParam("estado") String estado) {
//        try {
//            Service.instance().cambiarEstadoMedico(id, estado);
//        } catch (Exception ex) {
//            throw new NotFoundException();
//        }
//    }
//
//    //Actualizar la informacion de un medico
//    @PUT
//    @Path("{id}")
//    @Consumes(MediaType.APPLICATION_JSON)
//    public void updateMedico(@PathParam("id") String id, Medico m) {
//        try {
//            Service.instance().modificarMedico(id, m);
//        } catch (Exception ex) {
//            throw new NotFoundException();
//        }
//    }
//
//    //Borrar un medico
//    @DELETE
//    @Path("{id}")
//    public void delete(@PathParam("id") String id) {
//        try {
//            Service.instance().borrarMedico(id);
//        } catch (Exception e) {
//            throw new NotFoundException();
//        }
//    }


    
}
