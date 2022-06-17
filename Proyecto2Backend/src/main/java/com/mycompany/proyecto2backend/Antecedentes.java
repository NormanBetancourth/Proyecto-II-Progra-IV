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
import model.Antecedente;
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

@Path("/antecedentes")
public class Antecedentes {
    
    
    @GET
    @Path("{pac}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Antecedente> read(@PathParam("pac") String id) {
        try {
            return Service.instance().retornarListaAntecedentesPorID(id);
        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }
    
}
