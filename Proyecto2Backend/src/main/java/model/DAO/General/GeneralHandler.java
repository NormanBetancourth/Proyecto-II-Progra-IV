/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.DAO.General;

import model.DAO.SQLConnection.SQLExecutor;
import model.Medico;
import model.Usuario;
import model.Antecedente;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.Ciudad;
import model.Especialidad;
import model.Horario;
import model.Paciente;

/**
 *
 * @author Dell
 */
public class GeneralHandler {
    //final String usernameBD = "sass";
    final String usernameBD = "sa";
    final String passwordBD = "password";
    SQLExecutor executor;

    public GeneralHandler() {
        this.executor = new SQLExecutor(usernameBD, passwordBD);
    }
    
     //========================================METODOS DE RETORNO DATABASE ======================================
    
    //METODO QUE ME RETORNA A UN USUARIO DE LA BD SEGUN SU ID Y LO RETORNA
    public Usuario retornaUserPorId(String id) {
        Usuario usuario = new Usuario();
        String sql = "select * from usuarios where id = " + id + ";";
        ResultSet rs;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                usuario.setId(id);
                usuario.setNombre(rs.getString("nombre"));
                usuario.setTipo(rs.getString("tipo"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return usuario;
    }
    
    //METODO QUE ME RETORNA A UN MEDICO DE LA BD SEGUN SU ID Y LO RETORNA
    public Medico retornaMedicoPorId(String id) {
        Usuario user = this.retornaUserPorId(id);
        Medico usuario = new Medico(user);
        String sql1 = "select * from medicos where id = " + id + ";";
        ResultSet rs = null;
        
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql1);
            while (rs.next()) {
                usuario.setEspecialidad(this.retornaEspecialidadPorCodigo(rs.getString("especialidad")).getNombre());
                if (rs.getString("costo") != null) {
                    usuario.setFee(Float.parseFloat(rs.getString("costo")));
                } else {
                    usuario.setFee(0);
                }
                usuario.setLocalidad(this.retornaCiudadPorCodigo(rs.getString("ciudad")).getNombre());
                usuario.setClinica(rs.getString("clinica"));
                usuario.setEstado(rs.getString("estado"));
                usuario.setPresentacion(rs.getString("presentacion"));
                usuario.setPassword("clave");
                //NECESITA ESTAR EN LA BASE NO?
                usuario.setFotoPath("");
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return usuario;
    }
    //METODO QUE ME RETORNA A UN MEDICO DE LA BD SEGUN SU ID Y LO RETORNA

    public Paciente retornaPacientePorId(String id) {
        Usuario user = this.retornaUserPorId(id);
        Paciente usuario = new Paciente(user);
        String sql1 = "select * from pacientes where id = " + id + ";";
        ResultSet rs = null;

        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql1);
            while (rs.next()) {
                usuario.setTelefono(rs.getString("telefono"));
                //NECESITA ESTAR EN LA BASE NO?
                usuario.setFotoPath("");
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return usuario;
    }
    
    //METODO QUE ME RETORNA UNA ESPECIALIDAD SEGUN SU CODIGO
    public Especialidad retornaEspecialidadPorCodigo(String codigo) {
        Especialidad especialidad = new Especialidad();
        String sql = "select * from especialidades where codigo = " + codigo + ";";
        ResultSet rs;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                especialidad.setCodigo(codigo);
                especialidad.setNombre(rs.getString("nombre"));
                especialidad.setDescripcion(rs.getString("descripcion"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return especialidad;
    }
    
    //METODO QUE ME RETORNA UNA CIUDAD SEGUN SU CODIGO
    public Ciudad retornaCiudadPorCodigo(String codigo) {
        Ciudad ciudad = new Ciudad();
        String sql = "select * from ciudades where codigo = " + codigo + ";";
        ResultSet rs;

        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                ciudad.setCodigo(codigo);
                ciudad.setNombre(rs.getString("nombre"));
                ciudad.setProvincia(rs.getString("provincia"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ciudad;
    }
    
        //METODO QUE ME RETORNA UN HORARIO SEGUN SU CODIGO
    public Horario retornaHorarioPorCodigo(String codigo) {
        Horario horario = new Horario();
        String sql = "select * from horarios where codigo = " + codigo + ";";
        ResultSet rs;

        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                horario.setCodigo(codigo);
                horario.setDia(rs.getString("dia"));
                horario.setFrecuencia(rs.getString("frecuencia")); //00:30 o 01:00 -> asi se maneja
                horario.setHoraInicio(rs.getString("hora_inicio"));
                horario.setHoraFinal(rs.getString("hora_final"));
                horario.setIdMedico(rs.getString("id_medico"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return horario;
    }
    
    //METODO QUE ME RETORNA UNA LISTA DE ANTECEDENTES SEGUN EL CODIGO DEL PACIENTE
    public List<Antecedente> listaAntecedentesPorId(String id) {
        List<Antecedente> lista = new ArrayList<>();
        String sql = "select * from antecedentes where id_paciente = "+id+";";
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            ResultSet rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
               Antecedente antecedente = new Antecedente();
               antecedente.setAnotacion(rs.getString("anotacion"));
               antecedente.setCodigo(rs.getString("codigo"));
               antecedente.setTipo(rs.getString("tipo"));
               lista.add(antecedente);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return lista;
    }
    
    //METODO QUE ME RETORNA TODA LA LISTA DE MEDICOS
    public List<Medico> listarMedicos() {
        List<Medico> lista = new ArrayList<>();
        Medico medico = null;
        String sql = "select * from medicos;";
        String id;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            ResultSet rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                    id = rs.getString("id");
                    medico = this.retornaMedicoPorId(id);
                    lista.add(medico);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return lista;
    }
    
    //METODO QUE ME RETORNA TODA LA LISTA DE ESPECIALIDADES
    public List<Especialidad> listarEspecialidades() {
        List<Especialidad> lista = new ArrayList<>();
        Especialidad esp = null;
        String sql = "select * from especialidades;";
        String codigo;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            ResultSet rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                codigo = rs.getString("codigo");
                esp = this.retornaEspecialidadPorCodigo(codigo);
                lista.add(esp);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return lista;
    }
    
    //METODO QUE ME RETORNA TODA LA LISTA DE ESPECIALIDADES
    public List<Ciudad> listarCiudades() {
        List<Ciudad> lista = new ArrayList<>();
        Ciudad esp = null;
        String sql = "select * from ciudades;";
        String codigo;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            ResultSet rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                codigo = rs.getString("codigo");
                esp = this.retornaCiudadPorCodigo(codigo);
                lista.add(esp);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return lista;
    }
    
    //METODO QUE ME RETORNA TODA LA LISTA DE PACIENTES
    public List<Paciente> listarPacientes() {
        List<Paciente> lista = new ArrayList<>();
        Paciente paciente = null;
        String sql = "select * from pacientes;";
        String id;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            ResultSet rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
                    id = rs.getString("id");
                    paciente = this.retornaPacientePorId(id);
//                    paciente.setAntecedente(this.listaAntecedentesPorId(id));
                    lista.add(paciente);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return lista;
    }
    

    //METODO QUE ME RETORNA UNA LISTA DE HORARIOS SEGUN EL ID DEL MEDICO
    public List<Horario> listaHorariosPorMedico(String idMed) {
        List<Horario> lista = new ArrayList<>();
        String sql = "select * from horarios where id_medico = "+idMed+";";
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            ResultSet rs = executor.ejecutaQuery(sql);
            while (rs.next()) {
               Horario horario = new Horario();
                horario.setCodigo(rs.getString("codigo"));
                horario.setDia(rs.getString("dia"));
                horario.setFrecuencia(rs.getString("frecuencia")); //00:30 o 01:00 -> asi se maneja
                horario.setHoraInicio(rs.getString("hora_inicio"));
                horario.setHoraFinal(rs.getString("hora_final"));
                horario.setIdMedico(idMed);
                lista.add(horario);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return lista;
    }
    
     //========================================METODOS DE REGISTRO DATABASE ======================================
    
//METODO PARA REGISTRAR UN USUARIO EN LA BASE DE DATOS
    public boolean registrarUsuario(String username, String id, String tipo) {
        if (!verificaUsuarioExiste(id)) {
            try {
                executor = new SQLExecutor(usernameBD, passwordBD);
                String valores1[] = new String[4];
                valores1[0] = "insert into usuarios(id, nombre,tipo) values (?, ?, ?)";
                valores1[1] = id;
                valores1[2] = username;
                valores1[3] = tipo;
                executor.prepareStatement(valores1);
                return true;
            } catch (Exception throwables) {
                throwables.printStackTrace();
            }
        }
        return false;
    }
    
    //METODO PARA REGISTRAR UN MEDICO
    public boolean registrarMedico(String username, String id, String clave, String especialidad, String costo, String ciudad, String clinica, String presentacion) {
        try {
            //registra a un usuario en la base de datos
            this.registrarUsuario(username, id, "Medico");
            executor = new SQLExecutor(usernameBD, passwordBD);
            String valores1[] = new String[9];
            valores1[0] = "insert into medicos(id, especialidad, costo, ciudad, clinica, estado, presentacion, clave) values (?, ?, ?, ?, ?, ?, ?,?);";
            valores1[1] = id;
            valores1[2] = especialidad;
            valores1[3] = costo;
            valores1[4] = ciudad;
            valores1[5] = clinica;
            valores1[6] = "Espera";
            valores1[7] = presentacion;
            valores1[8] = clave;
            executor.prepareStatement(valores1);
            return true;

        } catch (Exception throwables) {
            throwables.printStackTrace();
        }
        return false;
    }
    
    //METODO PARA REGISTRAR UN PACIENTE
    public boolean registrarPaciente(String id, String username) {
        try {
            this.registrarUsuario(username, id, "Paciente");
            executor = new SQLExecutor(usernameBD, passwordBD);
            String valores1[] = new String[2];
            valores1[0] = "insert into pacientes(id) values (?);";
            valores1[1] = id;
            executor.prepareStatement(valores1);
            return true;

        } catch (Exception throwables) {
            throwables.printStackTrace();
        }

        return false;
    }
    
    //METODO QUE REGISTRARA UN HORARIO PARA UN MEDICO
    public boolean registrarHorario(String idMed, String codigo, String dia,String horaInicio, String horaFinal, String frecuencia ) {
        if (verificaUsuarioExiste(idMed) && !verificaCodigoHorario(codigo) ) {
            try {
                executor = new SQLExecutor(usernameBD, passwordBD);
                String valores1[] = new String[7];
                valores1[0] = "insert into horarios(codigo, id_medico, dia, hora_inicio, hora_final, frecuencia) values (?, ?, ?, ?, ?, ?);";
                valores1[1] = codigo;
                valores1[2] = idMed;
                valores1[3] = dia;
                valores1[4] = horaInicio; //'13:00:00' -> se inserta en este formato
                valores1[5] = horaFinal; //'15:00:00' -> se inserta en este formato
                valores1[6] = frecuencia; //'01:00' -> se inserta en este formato
                executor.prepareStatement(valores1);
                return true;
            } catch (Exception throwables) {
                throwables.printStackTrace();
            }
        }
        return false;
    }
    
    //========================================METODOS DE VERIFICACION DATABASE ======================================
    
    //ME VERIFICA SI UN USUARIO EXISTE EN LA BD
    public boolean verificaUsuarioExiste(String id) {
        ResultSet resultSet;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            resultSet = executor.ejecutaQuery("select * from usuarios");
            while (resultSet.next()) {
                if (resultSet.getString("id").equals(id)) {
                    return true;
                }
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
        return false;
    }
    
    //ME VERIFICA SI UN CODIGO EXISTE EN LOS HORARIOS DB
    public boolean verificaCodigoHorario(String codigo) {
        ResultSet resultSet;
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            resultSet = executor.ejecutaQuery("select * from horarios");
            while (resultSet.next()) {
                if (resultSet.getString("codigo").equals(codigo)) {
                    return true;
                }
            }
        } catch (SQLException exception) {
            exception.printStackTrace();
        }
        return false;
    }
    
    //========================================METODOS DE BORRADO DATABASE ======================================
    public boolean borrarUsuario(String id) {
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            String valores1[] = new String[2];
            valores1[0] = "delete from usuarios where id = ?;";
            valores1[1] = id;
            executor.prepareStatement(valores1);
            return true;
        } catch (Exception throwables) {
            throwables.printStackTrace();
        }

        return false;
    } 

//BORRAR MEDICO POR ID
    public boolean borrarMedico(String id) {
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            String valores[] = new String[2];
            valores[0] = "delete from medicos where id = ?;";
            valores[1] = id;
            executor.prepareStatement(valores);
            this.borrarUsuario(id);
            return true;
        } catch (Exception throwables) {
            throwables.printStackTrace();
        }
        return false;
    }
    
    //BORRAR PACIENTE POR ID
    public boolean borrarPaciente(String id) {
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            String valores[] = new String[2];
            valores[0] = "delete from pacientes where id = ?;";
            valores[1] = id;
            executor.prepareStatement(valores);
            this.borrarUsuario(id);
            return true;
        } catch (Exception throwables) {
            throwables.printStackTrace();
        }
        return false;
    }
     //BORRAR HORARIO POR CODIGO
       public boolean borrarHorario(String codigo) {
        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            String valores1[] = new String[2];
            valores1[0] = "delete from horarios where codigo = ?;";
            valores1[1] = codigo;
            executor.prepareStatement(valores1);
            return true;
        } catch (Exception throwables) {
            throwables.printStackTrace();
        }
        return false;
    } 
    
     //========================================METODOS DE ACTUALIZACION EN LA BASE DE DATOS ======================================
    
     public void modificarEstadoMedico(String id, String estado){
        if(this.verificaUsuarioExiste(id)){
            try{
                executor = new SQLExecutor(usernameBD, passwordBD);
                String valores[] = new String[3];
                valores[0] = "update medicos set estado = ? where id = ?;";
                valores[1] = estado;
                valores[2] = id;
                executor.prepareStatement(valores);
            } catch(Exception throwables){
                throwables.printStackTrace();
            }
        }
    }
     
     //MODIFICAR INFORMACION DE MEDICO gen.modificarDatosMedico("101", "2", "10000", , "1001", "Athenas", "", "clave101","");
     public boolean modificarDatosMedico(String id, String especialidad, String costo, String ciudad, String clinica, String fotoPath, String presentacion, String clave) {
        boolean respuesta = false;
        if (this.verificaUsuarioExiste(id)) {
            // El id y su estado no puede cambiar
            try {
                executor = new SQLExecutor(usernameBD, passwordBD);
                String valores[] = new String[8];
                valores[0] = "update medicos set especialidad = ?, costo = ?, ciudad = ?, clinica = ?, clave = ?, presentacion = ? where id = ?;";
                valores[1] = especialidad;
                valores[2] = costo;
                valores[3] = ciudad;
                valores[4] = clinica;
                valores[5] = clave;
                valores[6] = presentacion;
                valores[7] = id;
                executor.prepareStatement(valores);
                respuesta = true;

            } catch (Exception throwables) {
                throwables.printStackTrace();
            }
        }
        return respuesta;
    }
}




