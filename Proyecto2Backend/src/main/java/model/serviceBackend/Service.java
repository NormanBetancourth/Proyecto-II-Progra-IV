/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.serviceBackend;

import java.util.ArrayList;
import java.util.List;
import model.Antecedente;
import model.Ciudad;
import model.DAO.General.GeneralHandler;
import model.Horario;
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
    
    //===========Metodos de servicio para el Medico========
    public Medico retornarMedicoPorID(String id) {
        return genDB.retornaMedicoPorId(id);
    }
    
     public void registrarMedico(Medico med){
        //falta validacion de ser necesaria que el codigo de especialidad y ciudad se pasen a string respectivamente
        genDB.registrarMedico(med.getNombre(), med.getId(), med.getPassword(), "4", (med.getFee()+""), "1000", med.getClinica(), med.getPresentacion());
    }
     
    public void cambiarEstadoMedico(String id, String estado) {
        genDB.modificarEstadoMedico(id, estado);
    }
     
    public List<Medico> retornarListaMedicos() {
        return genDB.listarMedicos();
    }

    //===========Metodos de servicio para el Paciente========
    
    public void registrarPaciente(Paciente pac) {
        genDB.registrarPaciente(pac.getId(), pac.getNombre());
    }
    
    public List<Paciente> retornarListaPacientes(){
        return genDB.listarPacientes();
    }
    
    public List<Antecedente> retornarListaAntecedentesPorID(String id){
        return genDB.listaAntecedentesPorId(id);
    }
    
    public void borrarPacientePorId(String id){
        genDB.borrarPaciente(id);
    }
    
    //===========Metodos de servicio para los Horarios========
    public void registrarHorario(Horario hor){
        genDB.registrarHorario(hor.getIdMedico(), hor.getCodigo(), hor.getDia(), hor.getHoraInicio(), hor.getHoraFinal(), hor.getFrecuencia());
    }
    
    public Horario retornaHorarioPorCodigo(String codigo){
        return genDB.retornaHorarioPorCodigo(codigo);
    }
    
    public void borrarHorarioPorCodigo(String codigo){
       genDB.borrarHorario(codigo);
    }
    
    //===========Metodos de servicio para los Horarios========
    public Usuario retornarUsuarioID(String id){
        return genDB.retornaUserPorId(id);
    }
   
        
}
