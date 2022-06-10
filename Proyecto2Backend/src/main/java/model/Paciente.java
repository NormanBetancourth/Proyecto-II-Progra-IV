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
    String fotoPath;
    String telefono;
//    List<Antecedente> antecedentes;
    //contactos de emergencia

     public Paciente(Usuario user){
        super.setNombre(user.getNombre());
        super.setId(user.getId());
        super.setTipo(user.getTipo());
    }
     
    public Paciente(String nombre, String id, String tipo, String fotoPath, String telefono) {
        super(nombre, id, tipo);
        this.fotoPath = fotoPath;
        this.telefono = telefono;
//        this.antecedentes = null;
    }

    public Paciente() {
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



    @Override
    public String toString() {
        return super.toString() +"Paciente{"  + ", fotoPath=" + fotoPath + ", telefono=" + telefono+"}";        
    }

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

//    public List<Antecedente> getAntecedente() {
//        return antecedentes;
//    }
//
//    public void setAntecedente(List<Antecedente> antecedente) {
//        this.antecedentes = antecedente;
//    }
   
}
