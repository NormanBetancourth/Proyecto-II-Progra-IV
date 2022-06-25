/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Contacto {
    String numero;
    String id;
    String idPaciente;
    String nombre;
    String telefono;

    public Contacto(String numero, String id, String idPaciente, String nombre, String telefono) {
        this.numero = numero;
        this.id = id;
        this.idPaciente = idPaciente;
        this.nombre = nombre;
        this.telefono = telefono;
    }

    public Contacto() {
    }
    
    

    public String getNumero() {
        return numero;
    }

    public String getId() {
        return id;
    }

    public String getIdPaciente() {
        return idPaciente;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIdPaciente(String idPaciente) {
        this.idPaciente = idPaciente;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Contacto{" + "numero=" + numero + ", id=" + id + ", idPaciente=" + idPaciente + ", nombre=" + nombre + ", telefono=" + telefono + '}';
    }
    
}
