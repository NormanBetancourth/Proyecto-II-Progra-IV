/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.proyecto2backend;

import static java.lang.System.in;
import java.util.ArrayList;
import java.util.List;
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
import javax.ws.rs.core.MediaType;
import model.Medico;
import model.Usuario;
import model.Horario;

/**
 *
 */


//password,especialidad, fee, localidad, clinica, fotoPath, presentacion, estado, nombre,id, tipo


@Path("/medicos")
public class Medicos {
    ArrayList<Medico> user = new ArrayList();
    public void cargarDatos(){
        user.add(new Medico("111", "Cirugia", 120000,"San Jose", "Clorito", "./", "Hola soy norman", "Activo", "Norman", "111", "Medico"));
        user.add(new Medico("222", "Pediatría", 80000,"Heredia", "San Bosco", "./", "Hola soy Jose", "Activo", "JOSE", "222", "Medico"));
    }
    
    //POST
    
    @POST
    @Consumes (MediaType.APPLICATION_JSON)
    public void create(Medico user){
        try {
            System.out.println("USUARIO al CREAR \n"+user);
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }
    //GET
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Medico> read(){
        cargarDatos();
        return user;
    }
    
    //GET/ID
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Medico read(@PathParam("id") String id){
        cargarDatos();
        try {
            for(Medico medico : user){
                if (medico.getId().equals(id)) {
                    return medico;
                }
            }
        } catch (Exception e) {
            throw new NotFoundException();
        }
        
        return null;
    }
    
    
    //PUT/ID
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(@PathParam("id") String id, Medico m){
        try {
            for (int i = 0; i < user.size() ; i++) {
                if (user.get(i).getId().equals(id)) {
                    user.set(i, m);
                    System.out.println(user.get(i));
                    break;
                } 
            }
            System.out.println("no encontrado");
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }
    
    //DELETE/ID
    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") String id){
        try {
            for (int i = 0; i < user.size(); i++) {
                if (user.get(i).getId().equals(id)) {
                    System.out.println("Se elimina: "+user.get(i));
                    user.remove(i);
                    break;
                }
            }
            System.out.println(user);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }
    
    
    
}
