/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.HashMap;

/**
 *
 * @author norma
 */
public class Paciente extends Usuario {
    HashMap<String, String> contactosDeEmergencaia;
    String fotoPath;
    String telefono;
    HashMap<String, Antecedentes> antecedentes;

    public Paciente(String nombre, String id, String tipo, String fotoPath, String telefono) {
        super(nombre, id, tipo);
        this.contactosDeEmergencaia = new HashMap();
        this.fotoPath = fotoPath;
        this.telefono = telefono;
        this.antecedentes = new HashMap();
    }

    public Paciente() {
    }

    public HashMap<String, String> getContactosDeEmergencaia() {
        return contactosDeEmergencaia;
    }

    public String getFotoPath() {
        return fotoPath;
    }

    public String getTelefono() {
        return telefono;
    }

    public HashMap<String, Antecedentes> getAntecedentes() {
        return antecedentes;
    }

    public void setContactosDeEmergencaia(HashMap<String, String> contactosDeEmergencaia) {
        this.contactosDeEmergencaia = contactosDeEmergencaia;
    }

    public void setFotoPath(String fotoPath) {
        this.fotoPath = fotoPath;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setAntecedentes(HashMap<String, Antecedentes> antecedentes) {
        this.antecedentes = antecedentes;
    }

    @Override
    public String toString() {
        return super.toString() +"Paciente{" + "contactosDeEmergencaia=" + contactosDeEmergencaia + ", fotoPath=" + fotoPath + ", telefono=" + telefono + ", antecedentes=" + antecedentes + '}';        
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
    
    
    
    
    
    
    
    
    
    
}
