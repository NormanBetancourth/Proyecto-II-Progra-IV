/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Ciudad {
    String codigo;
    String nombre;
    String provincia;

    public Ciudad(String codigo, String nombre, String provincia) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.provincia = provincia;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    @Override
    public String toString() {
        return "Ciudad{" + "codigo=" + codigo + ", nombre=" + nombre + ", provincia=" + provincia + '}';
    }

    
    
}
