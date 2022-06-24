/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.DAO.General;

import java.util.ArrayList;
import java.util.List;
import model.Antecedente;
import model.Cita;
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

        //===prueba de registrar un horario [exitosa]===
        //gen.registrarHorario("101", "inactivo", "Lunes", "13:00:00",  "16:00:00", "00:30");
        
        //=====prueba de registrar una cita[exitosa]===
        gen.registrarCita("101", "106", "2022-05-10 16:00:00", "Presion alta", "presion", "ebola", "codeina ultra", "cada 3 horas", "1200");
        
        gen.modificarEstadoCita("1200", "Finalizado");
        //=====prueba de registrar un contacto[exitosa]===
        gen.registrarContacto("104", "123", "Pablo", "84201987");
        
        
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
         Horario schedule = gen.retornaHorarioPorIdMedYDia("Lunes", "101");
         System.out.println("=HORARIO: "+schedule.toString());
         
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
        
        //===prueba de retornar lista de horarios ACTIVOS de un medico[exitosa]===
        List<Horario> listHorariosActivos = gen.retornaHorariosActivosMed("101");
        System.out.println(listHorariosActivos.toString());
        
        //===prueba de retornar lista de horarios de un medico[exitosa]===
        List<Especialidad> listEspecialidades = gen.listarEspecialidades();
        System.out.println(listEspecialidades.toString());
        
        //===prueba de retornar lista de ciudades[exitosa]===
        List<Ciudad> listCiudades = gen.listarCiudades();
        System.out.println(listCiudades.toString());
        
        //===prueba de retornar lista de citas[exitosa]===
        List<Cita> listCitasDia = gen.listaCitasPorMedicoDia("101", "2022-04-10");
        System.out.println(listCitasDia.toString());
        
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
          
          //===prueba de borrar contacto de paciente DB [exitosa] ===
          borrado = gen.borrarContactoPaciente("123") ? "Se borro el paciente" : "No se borro el paciente";
          System.out.println(borrado);
          
          //=============METODOS DE ACTUALIZACION EN LA BD====================//
          
           //===prueba de modificar estado de medico DB [exitosa] ===
           gen.modificarEstadoMedico("101", "Aprobado");
           
           //===prueba de modificar datos de paciente DB [exitosa] ===
           gen.modificarDatosPaciente("103", "8888888", "Fulano");
           
           //===prueba de modificarmedico DB [exitosa] ===
           borrado = gen.modificarDatosMedico("101", "2", "10000","1001", "Athenas", "","presentacion101", "clave101")? "Se actualizo el medico": "No se actualizo el medico";
           System.out.println( borrado);
           
            //===prueba de modificarmedico DB [exitosa] ===
            gen.modificarContacto("Hector", "123455065", "6000");
           
           //===PRUEBA DE ACTUALIZAR HORARIOS DE UN MEDICO CON LISTA DE HORARIOS ===
           Horario h1 = new Horario("","102","Martes","10:00","13:00","01:00");
           Horario h2 = new Horario("", "102", "Viernes", "10:00", "12:00", "00:30");
           
           List<Horario> lh = new ArrayList();
           lh.add(h1);
           lh.add(h2);
           System.out.println(lh.toString());
           gen.modificarHorariosMedico(lh, "102");
         
    }
}
