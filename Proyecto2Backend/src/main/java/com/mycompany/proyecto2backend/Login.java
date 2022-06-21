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
import model.serviceBackend.Service;

/**
 *
 */


//password,especialidad, fee, localidad, clinica, fotoPath, presentacion, estado, nombre,id, tipo


@Path("/session")
public class Login {
    @Context
     HttpServletRequest request;
    
    @POST
    @Path("login/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario login(@PathParam("id") String id ){
        HttpSession session = request.getSession(true);
        session.setAttribute("user", Service.instance().retornarUsuarioID(id));
        Usuario m = (Usuario) session.getAttribute("user");
        return m;
    }
    
    @GET
    @Path("current")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario getUser() {
        HttpSession session = request.getSession(true);
        Usuario u = (Usuario) session.getAttribute("user");
        return u;
    }
    
    
    @POST
    @Path("logout")
    public void logout(){
        HttpSession session = request.getSession(true);
        //remuevo el usuario de la sesion
        session.removeAttribute("user");
        //Se invalida la sesion
        session.invalidate();
    }
    
}
