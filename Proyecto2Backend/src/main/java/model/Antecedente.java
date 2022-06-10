/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Antecedente {
    String codigo;
    String tipo;
    String anotacion;
    
    //TODO:

    public Antecedente(String codigo, String tipo, String anotacion) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.anotacion = anotacion;
    }
    public Antecedente() {
        this.codigo = "";
        this.tipo = "";
        this.anotacion = "";
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getAnotacion() {
        return anotacion;
    }

    public void setAnotacion(String anotacion) {
        this.anotacion = anotacion;
    }

    @Override
    public String toString() {
        return "Antecedentes{" + "codigo=" + codigo + ", tipo=" + tipo + ", anotacion=" + anotacion + '}';
    }
    
    
    
    
    
}
