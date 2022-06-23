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
    String estado;
    String dia;
    String frecuencia;
    String horaInicio;
    String horaFinal;

    public Horario(String estado, String idMedico, String dia, String horaInicio, String horaFinal, String frecuencia) {
        this.estado = estado;
        this.idMedico = idMedico;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.frecuencia = frecuencia;
    }
     public Horario() {
        this.idMedico = "";
        this.estado = "";
        this.dia = "";
        this.frecuencia = "";
        this.horaInicio = "";
        this.horaFinal = "";
    }

    public String getEstado() {
        return estado;
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

    public void setEstado(String estado) {
        this.estado = estado;
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
        return "Horario{" + "idMedico=" + idMedico + ", estado=" + estado + ", dia=" + dia + ", frecuencia=" + frecuencia + ", horaInicio=" + horaInicio + ", horaFinal=" + horaFinal + '}';
    }



    public void setEstadoV2(String estado) {
        this.estado = estado;
    }
}