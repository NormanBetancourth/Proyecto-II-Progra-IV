/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.serviceBackend;

import java.util.ArrayList;
import java.util.List;
import model.Antecedente;
import model.Cita;
import model.Ciudad;
import model.Contacto;
import model.DAO.General.GeneralHandler;
import model.Especialidad;
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
        genDB.registrarMedico(med.getNombre(), med.getId(), med.getPassword(), "4", (med.getFee()+""), "1000", med.getClinica(), med.getPresentacion(), med.getFotoPath());
    }
     
     public void borrarMedico(String id){
         genDB.borrarMedico(id);
     }
    public void registrarAntecedente(Antecedente a){
         genDB.registrarAntecedente(a);
    }
     
    public void cambiarEstadoMedico(String id, String estado) {
        genDB.modificarEstadoMedico(id, estado);
    }
    
    public void modificarMedico(String id, Medico m){
        genDB.modificarDatosMedico(id, m.getEspecialidad(), (m.getFee()+""), m.getLocalidad(), m.getClinica(), "fotoPath", m.getPresentacion(), m.getPassword());
    }
     
    public List<Medico> retornarListaMedicos() {
        return genDB.listarMedicos();
    }

    //===========Metodos de servicio para el Paciente========
    
    public void registrarPaciente(Paciente pac) {
        genDB.registrarPaciente(pac.getId(), pac.getNombre(), pac.getTelefono(), pac.getIdMed(), pac.getFotoPath());
    }
    
    public Paciente retornarPaciente(String idPac){
        return genDB.retornaPacientePorId(idPac);
    }
    
    public void borrarPacientePorId(String id) {
        genDB.borrarPaciente(id);
    }
    
    public void modificarPaciente(Paciente pac){
        genDB.modificarDatosPaciente(pac.getId(), pac.getTelefono(), pac.getNombre());
    }
    
    public List<Paciente> retornarListaPacientes(){
        return genDB.listarPacientes();
    }
    
    public List<Paciente> retornarListaPacientesIdMed(String idMed){
        return genDB.listarPacientesPorIdMed(idMed);
    }
    
    public List<Antecedente> retornarListaAntecedentesPorID(String id){
        return genDB.listaAntecedentesPorId(id);
    }
    
    
    public List<Contacto> retornarListaContactosPorID(String id){
        return genDB.listaContactosPorId(id);
    }
   
    
    //===========Metodos de servicio para los Horarios========
    public Horario retornaHorarioMedico(String dia, String idMed){
        return genDB.retornaHorarioPorIdMedYDia(dia, idMed);
    }
    

    public void modificarHorariosMedico(List<Horario> lh, String idMed){
         System.out.println("======ENTRO EN SERVICE=========");
        genDB.modificarHorariosMedico(lh, idMed);
    }
    
    public List<Horario> retornarHorariosActivos(String idMed){
        return genDB.retornaHorariosActivosMed(idMed);
    }
    //===========Metodos de servicio para CITAS========
    public void registrarCitaMedicoPaciente(Cita cit){
        genDB.registrarCita(cit.getMedico().getId(), cit.getPaciente().getId(), cit.getFecha(), cit.getSignos(), cit.getMotivo(), cit.getDiagnostico(), cit.getPrescripciones(), cit.getMedicamentos(), cit.getCodigo());
    }
    
    public void modificarCitaMedico(Cita cit){
        genDB.modificarDatosCita(cit.getCodigo(), cit.getSignos(), cit.getDiagnostico(), cit.getPrescripciones(), cit.getMedicamentos());
    }
    
    public void modificarEstadoCita(String codigo, String estado){
        genDB.modificarEstadoCita(codigo, estado);
    }
    
    public List<Cita> retornarListaDeCitaPorDia(String idMed, String fecha){      
        return genDB.listaCitasPorMedicoDia(idMed, fecha);
    }
    

    public List<Cita> retornarListaDeCitaPorPaciente(String idMed, String id){      
        return genDB.listaCitasPorMedicoPaciente(idMed, id);
    }

        //===========Metodos de servicio para los Usuarios========
    public Usuario retornarUsuarioID(String id){
        return genDB.retornaUserPorId(id);
    }
    
    //===========Metodos de servicio para las Especialidades========
    public Especialidad retornarEspecialidad(String codigo){
        return genDB.retornaEspecialidadPorCodigo(codigo);
    }
    
    public List<Especialidad> retornarListaEspecialidades(){
        return genDB.listarEspecialidades();
    }
    
    //===========Metodos de servicio para las Ciudades========
    public Ciudad retornarCiudad(String codigo) {
        return genDB.retornaCiudadPorCodigo(codigo);
    }

    public List<Ciudad> retornarListaCiudades() {
        return genDB.listarCiudades();
    }
    //===========Metodos de servicio para los contactos=======
    
    public void registrarContacto(Contacto c){
        genDB.registrarContacto(c.getIdPaciente(), c.getId(), c.getNombre(), c.getTelefono());
    }
     
    public void borrarContacto(String numero){
        genDB.borrarContactoPaciente(numero);
    }
    
    public void modificarContacto(Contacto c){
        genDB.modificarContacto(c.getNombre(), c.getTelefono(), c.getNumero());
    }

    public void registrarCitaMedicoPaciente2(Cita cit) {
        genDB.registrarCita2(cit.getMedico().getId(), cit.getPaciente().getId(), cit.getFecha(), cit.getSignos(), cit.getMotivo(), cit.getDiagnostico(), cit.getPrescripciones(), cit.getMedicamentos(), cit.getCodigo());
    }

    public void atenderCita(Cita c) {
        genDB.modificarDatosCita2(c.getCodigo(), c.getSignos() , c.getDiagnostico(), c.getPrescripciones(), c.getMedicamentos(), c.getMotivo());
    }
}
