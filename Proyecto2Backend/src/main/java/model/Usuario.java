/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Usuario {
    String nombre;
    String id;
    String tipo;

    public Usuario(String nombre, String id, String tipo) {
        this.nombre = nombre;
        this.id = id;
        this.tipo = tipo;
    }
    public Usuario() {
        this.nombre = "";
        this.id = "";
        this.tipo = "";
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

    @Override
    public String toString() {
        return "Usuario{" + "nombre=" + nombre + ", id=" + id + ", tipo=" + tipo + '}';
    }
    
}
