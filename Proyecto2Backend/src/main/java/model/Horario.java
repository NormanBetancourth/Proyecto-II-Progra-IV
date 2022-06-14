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

    public Horario(String codigo, String idMedico, String dia, String horaInicio, String horaFinal, String frecuencia) {
        this.codigo = codigo;
        this.idMedico = idMedico;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.frecuencia = frecuencia;
    }
     public Horario() {
        this.idMedico = "";
        this.codigo = "";
        this.dia = "";
        this.frecuencia = "";
        this.horaInicio = "";
        this.horaFinal = "";
    }

    public String getCodigo() {
        return codigo;
    }

    public String getIdMedico() {
        return idMedico;
    }

    public String getDia() {
        return dia;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public String getHoraFinal() {
        return horaFinal;
    }

    public String getFrecuencia() {
        return frecuencia;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setIdMedico(String idMedico) {
        this.idMedico = idMedico;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public void setHoraFinal(String horaFinal) {
        this.horaFinal = horaFinal;
    }

    public void setFrecuencia(String frecuencia) {
        this.frecuencia = frecuencia;
    }

    @Override
    public String toString() {
        return "Horario{" + "codigo=" + codigo + ", idMedico=" + idMedico + ", dia=" + dia + ", horaInicio=" + horaInicio + ", horaFinal=" + horaFinal + ", frecuencia=" + frecuencia + '}';
    }
}