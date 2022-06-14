/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Horario {
    String idMedico;
    String codigo;
    String dia;
    String frecuencia;
    String horaInicio;
    String horaFinal;

    
    //TODO:

    public Horario(String idMedico, String codigo, String dia, String frecuencia, String horaInicio, String horaFinal) {
        this.idMedico = idMedico;
        this.codigo = codigo;
        this.dia = dia;
        this.frecuencia = frecuencia;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
    }
    
     public Horario() {
        this.idMedico = "";
        this.codigo = "";
        this.dia = "";
        this.frecuencia = "";
        this.horaInicio = "";
        this.horaFinal = "";
    }

    public String getIdMedico() {
        return idMedico;
    }

    public void setIdMedico(String idMedico) {
        this.idMedico = idMedico;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(String frecuencia) {
        this.frecuencia = frecuencia;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(String horaFinal) {
        this.horaFinal = horaFinal;
    }

    @Override
    public String toString() {
        return "Horario{" + "idMedico=" + idMedico + ", codigo=" + codigo + ", dia=" + dia + ", frecuencia=" + frecuencia + ", horaInicio=" + horaInicio + ", horaFinal=" + horaFinal + '}';
    }
     
    
}
