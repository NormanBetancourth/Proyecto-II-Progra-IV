/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.HashMap;
import java.util.List;

/**
 *
 * @author norma
 */
public class Paciente extends Usuario {
    String telefono;
    String idMed;
    
    public void setIdMedico(String id){
        idMed = id;
    }
    //contactos de emergencia

     public Paciente(Usuario user){
        super.setNombre(user.getNombre());
        super.setId(user.getId());
        super.setTipo(user.getTipo());
    }
     
    public Paciente(String nombre, String id, String tipo, String fotoPath, String telefono, String idMed) {
        super(nombre, id, tipo, fotoPath);
        this.telefono = telefono;
        this.idMed = idMed;
    }

    public Paciente() {
        this.nombre = "";
        this.fotoPath="";
        this.id="";
        this.idMed="";
        this.telefono="";
        this.tipo = "";
    }

    public String getFotoPath() {
        return fotoPath;
    }
    

    public String getTelefono() {
        return telefono;
    }



    public void setFotoPath(String fotoPath) {
        this.fotoPath = fotoPath;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getIdMed() {
        return idMed;
    }

    public void setIdMed(String idMed) {
        this.idMed = idMed;
    }
    
    @Override
    public String getNombre() {
        return nombre;
    }
    
    @Override
    public String getId() {
        return id;
    }
    
    @Override
    public String getTipo() {
        return tipo;
    }
    
    @Override
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    @Override
    public void setId(String id) {
        this.id = id;
    }
    
    @Override
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public String toString() {
        return "Paciente{" +"id="+id+" nombre= "+nombre+ "fotoPath=" + fotoPath + ", telefono=" + telefono + ", idMed=" + idMed +'}';
    }
    
}
