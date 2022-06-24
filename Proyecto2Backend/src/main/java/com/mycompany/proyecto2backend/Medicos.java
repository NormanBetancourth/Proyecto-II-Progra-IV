/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.proyecto2backend;


import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import static java.lang.System.in;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
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
//import org.glassfish.jersey.media.multipart.FormDataParam;


//password,especialidad, fee, localidad, clinica, fotoPath, presentacion, estado, nombre,id


@Path("/medicos")
public class Medicos {
     
     String location="C:/images/";
    @Context
    HttpServletRequest request;
    
    
    //Registrar un medico en la BD
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(Medico m) {
        try {
            Service.instance().registrarMedico(m); //la clase de servicio invoca al metodo que creara una persona
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    
    //Obtener la lista de medicos
    //Obtener la lista de citas por dia
    // REQUEST QUE SE ENVIA EN LA PETICION:                                                                                              
    // const request = new Request(backend+'/medicos,  {method: 'GET', headers: {));
    @GET
    @Produces(MediaType.APPLICATION_JSON)//se coloca produces porque el metodo devuelve datos (en este caos una lista de personas)
    public List<Medico> read(){
        try {
           return Service.instance().retornarListaMedicos();
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    //Obtener un medico
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Medico read(@PathParam("id") String id){
        try {
           return Service.instance().retornarMedicoPorID(id);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
    
    
//    @POST
//    @Consumes(MediaType.MULTIPART_FORM_DATA) 
//    @Path("{cedula}/imagen")
//    public void addImage(@PathParam("cedula") String cedula, @FormDataParam("imagen") InputStream in) {  
//        try{
//                OutputStream out = new FileOutputStream(new File(location + cedula));
//                in.transferTo(out);
//                out.close();
//            } catch (Exception ex) {
//                throw new NotAcceptableException(); 
//            }
//    }
    
    
    //Actualizar el estado de un medico (solo el admin puede acceder a este metodo)
    @PUT
    @Path("{id}/{estado}")
    @RolesAllowed({"Admin"}) //verifica que el rol del usuario sea un admin (esta verificacion la hace junto a la clase autentication)
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateEstadoMedico(@PathParam("id") String id, @PathParam("estado") String estado) {  
        try {
        Service.instance().cambiarEstadoMedico(id, estado);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    //Actualizar la informacion de un medico
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateMedico(@PathParam("id") String id, Medico m) {  
        try {
        Service.instance().modificarMedico(id, m);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    
    //Borrar un medico
    @DELETE
    @Path("{id}")
    @RolesAllowed({"Admin"})
    public void delete(@PathParam("id") String id){
       try {
            Service.instance().borrarMedico(id);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }
    
    
    
}
