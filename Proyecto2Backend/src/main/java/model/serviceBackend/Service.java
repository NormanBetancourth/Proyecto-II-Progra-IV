/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.serviceBackend;

import java.util.ArrayList;
import java.util.List;
import model.DAO.General.GeneralHandler;
import model.Medico;
import model.Paciente;
import model.Usuario;

/**
 *
 * @author Dell
 */
public class Service {
    private static Service uniqueInstance;
    public GeneralHandler genDB;
    Usuario user;
    
    public static Service instance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Service();
        }
        return uniqueInstance;
    }
    

    private Service() {
     genDB = new GeneralHandler();
    }
    
    public List<Medico> retornarListaMedicos(){
        return genDB.listarMedicos();
    }
    
    public List<Paciente> retornarListaPacientes(){
        return genDB.listarPacientes();
    }
    
    public Usuario retornarUsuarioID(String id){
        return genDB.retornaUserPorId(id);
    }
}
