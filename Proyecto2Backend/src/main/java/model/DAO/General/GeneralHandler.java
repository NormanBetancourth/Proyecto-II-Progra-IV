/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.DAO.General;

import model.DAO.SQLConnection.SQLExecutor;
import model.Medico;
import model.Usuario;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Dell
 */
public class GeneralHandler {
    //final String usernameBD = "sas";
    //NOORMAN CAMBIA TU PASS A 'sa' berga >:v
    final String usernameBD = "sa";
    final String passwordBD = "password";
    SQLExecutor executor;

    public GeneralHandler() {
        this.executor = new SQLExecutor(usernameBD, passwordBD);
    }
    
    //METODO QUE ME EXTRAE A UN USUARIO DE LA BD SEGUN SU ID Y LO RETORNA
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
    
    //METODO QUE ME EXTRAE A UN MEDICO DE LA BD SEGUN SU ID Y LO RETORNA
    public Medico retornaMedicoPorId(String id) {
        Usuario user = this.retornaUserPorId(id);
        Medico usuario = new Medico(user);
        String sql1 = "select * from medicos where id = " + id + ";";
        ResultSet rs = null;

        try {
            executor = new SQLExecutor(usernameBD, passwordBD);
            rs = executor.ejecutaQuery(sql1);
            while (rs.next()) {
                usuario.setEspecialidad(rs.getString("especialidad"));
                if (rs.getString("costo") != null) {
                    usuario.setFee(Float.parseFloat(rs.getString("costo")));
                } else {
                    usuario.setFee(0);
                }
                usuario.setLocalidad(rs.getString("ciudad"));
                usuario.setClinica(rs.getString("clinica"));
                usuario.setEstado(rs.getString("estado"));
                usuario.setPresentacion(rs.getString("estado"));
                usuario.setPassword("clave");
                //NECESITA ESTAR EN LA BASE NO?
                usuario.setFotoPath("");
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return usuario;
    }

}
