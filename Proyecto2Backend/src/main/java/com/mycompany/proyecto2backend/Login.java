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


@Path("/login")
public class Login {
    @Context
     HttpServletRequest request;
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)//se coloca produces porque el metodo devuelve datos (en este caos una lista de personas)
    public Usuario login(Usuario usuario){
        //se verifica que exista el usuario
        //Se verifica la clave
        //Se guarda en la sesion
        //Se guarda el usuario
        return new Usuario();
    }
    
    @DELETE
    public void logout(){
//        HttpSession session = request.getSession(true);
//        //remuevo el usuario de la sesion
//        session.removeAttribute("atribute");
//        //Se invalida la sesion
//        session.invalidate();
    }
    
}
