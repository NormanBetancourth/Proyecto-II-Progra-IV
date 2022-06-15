/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.DAO.General;

import java.util.List;
import model.Antecedente;
import model.Ciudad;
import model.Especialidad;
import model.Horario;
import model.Medico;
import model.Paciente;
import model.Usuario;
import model.serviceBackend.Service;

/**
 *
 * @author Dell
 */
public class principalPruebaDAO {
    public static void main (String [ ] args) {
        GeneralHandler gen = new GeneralHandler();
        
        //=============METODOS DE REGISTRAR EN LA BD====================//

        //===prueba de registrar un medico [exitosa]===
        gen.registrarMedico("Mauriciooo", "120", "password", "4", "100000", "1000", "clinica", "presentacion");

        //===prueba de registrar un paciente [exitosa]===
        gen.registrarPaciente("130", "nombre paciente", "60901876", "101");

        //===prueba de registrar un horario [NULL]===
        gen.registrarHorario("101", "5010", "Lunes", "13:00:00",  "16:00:00", "00:30");
        
        //=============METODOS DE RETORNOS EN LA BD====================//
        
        //===prueba de retornar usuario BD [exitosa]====
        Usuario user = gen.retornaUserPorId("120");
        System.out.println("USUARIO MAIN: " + user.toString());
        
        //===prueba de retornar medico BD [exitosa]===
        Medico med = gen.retornaMedicoPorId("120");
        System.out.println(med.toString());

        //===prueba de retornar nombre de especialidad BD [exitosa]===
         Especialidad espec = gen.retornaEspecialidadPorCodigo("4");
         System.out.println(espec.toString());
         
        //===prueba de retornar nombre de ciudad BD [exitosa]===
         Ciudad city = gen.retornaCiudadPorCodigo("1000");
         System.out.println(city.toString());
         
          //===prueba de retornar horario por codigo BD [exitosa]===
         Horario schedule = gen.retornaHorarioPorCodigo("5000");
         System.out.println(schedule.toString());
         
        //===prueba de retornar lista de antecedentes de un paciente por id[exitosa]]===
          List<Antecedente> listAntec = gen.listaAntecedentesPorId("103");
          System.out.println(listAntec.toString());
          
        //===prueba de retornar lista de medicos[exitosa]===
         List<Medico> listMed = gen.listarMedicos();
         System.out.println(listMed.toString());
         
        //===prueba de retornar TODA lista de pacientes[exitosa]]===
        List<Paciente> listPac = gen.listarPacientes();
        System.out.println(listPac.toString());
        
        //===prueba de retornar lista de pacientes de cada medico[exitosa]]===
        List<Paciente> listPacMedico = gen.listarPacientesPorIdMed("101");
        System.out.println(listPacMedico.toString());
        
        //===prueba de retornar lista de horarios de un medico[exitosa]===
        List<Horario> listHorariosMed = gen.listaHorariosPorMedico("101");
        System.out.println(listHorariosMed.toString());
        
        //===prueba de retornar lista de horarios de un medico[exitosa]===
        List<Especialidad> listEspecialidades = gen.listarEspecialidades();
        System.out.println(listEspecialidades.toString());
        
        //===prueba de retornar lista de horarios de un medico[exitosa]===
        List<Ciudad> listCiudades = gen.listarCiudades();
        System.out.println(listCiudades.toString());
        
        //=============METODOS DE VERIFICACION EN LA BD====================//
        
        //===prueba de existencia de un usuario[exitosa]===
         String existe = gen.verificaUsuarioExiste("918")? "Existe": "No Existe";
         System.out.println(existe);
         
         //===prueba de crear un antecedente a un paciente[]===
         
         
         //=============METODOS DE BORRADO EN LA BD====================//
         
         //===prueba de borrar medico DB [exitosa] ===
          String borrado = gen.borrarMedico("120")? "Se borro el medico": "No se borro el medico";
          System.out.println( borrado);
          
         //===prueba de borrar paciente DB [exitosa] ===
          borrado = gen.borrarPaciente("130")? "Se borro el paciente": "No se borro el paciente";
          System.out.println( borrado);
          
          //===prueba de borrar Horario DB [exitosa] ===
          borrado = gen.borrarHorario("5010")? "Se borro el horario": "No se borro el horario";
          System.out.println(borrado);
          
          //=============METODOS DE ACTUALIZACION EN LA BD====================//
          
           //===prueba de modificar estado de medico DB [exitosa] ===
           gen.modificarEstadoMedico("101", "Aprobado");
           
           //===prueba de modificar datos de paciente DB [exitosa] ===
           gen.modificarDatosPaciente("103", "8888888", "Fulano");
           
           //===prueba de modificarmedico DB [exitosa] ===
           borrado = gen.modificarDatosMedico("101", "2", "10000","1001", "Athenas", "","presentacion101", "clave101")? "Se actualizo el medico": "No se actualizo el medico";
           System.out.println( borrado);
          
    
    }
}
