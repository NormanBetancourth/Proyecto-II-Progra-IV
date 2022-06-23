/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.proyecto2backend;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import model.Cita;
import model.Contacto;
import model.Usuario;
import model.serviceBackend.Service;

/**
 *
 * @author norma
 */
@Path("/contactos")
public class Contactos {
    
    @Context
    HttpServletRequest request;

    Usuario getCurrentMed() {
        HttpSession session = request.getSession(true);
        Usuario m = (Usuario) session.getAttribute("user");
        return m;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Contacto c) {
        try {
            System.out.println(c);
            //Service.instance().re(c);
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotAcceptableException();
        }
    }

    @GET
    @Path("{idPaciente}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Contacto> read(@PathParam("idPaciente") String idPaciente) {
        System.out.println(idPaciente);
        try {
            return Service.instance().retornarListaContactosPorID(idPaciente);
            
        } catch (Exception ex) {
            System.out.println(ex);
            throw new NotFoundException();

        }
    }
    
}
