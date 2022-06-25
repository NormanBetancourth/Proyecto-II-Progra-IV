/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.ArrayList;

/**
 *
 * @author norma
 */
public class Cita {
    Medico medico;
    Paciente paciente;
    String fecha;
    String motivo;
    String signos;
    String diagnostico;
    String estado;
    String prescripciones;
    String Medicamentos; 
    String codigo;

    public Cita(Medico medico, Paciente paciente, String fecha, String motivo, String signos, String diagnostico, String estado, String prescripciones, String Medicamentos, String codigo) {
        this.medico = medico;
        this.paciente = paciente;
        this.fecha = fecha;
        this.motivo = motivo;
        this.signos = signos;
        this.diagnostico = diagnostico;
        this.estado = estado;
        this.prescripciones = prescripciones;
        this.Medicamentos = Medicamentos;
        this.codigo = codigo;
    }

    public String getEstado() {
        return estado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getPrescripciones() {
        return prescripciones;
    }

    public String getMedicamentos() {
        return Medicamentos;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setPrescripciones(String prescripciones) {
        this.prescripciones = prescripciones;
    }

    public void setMedicamentos(String Medicamentos) {
        this.Medicamentos = Medicamentos;
    }

    
    public Cita() {
        this.medico = null;
        this.paciente = null;
        this.fecha = null;
        this.motivo = "";
        this.signos = "";
        this.diagnostico = "";
        this.estado = "";
        this.prescripciones = "";
        this.Medicamentos = "";
        this.codigo = "";
    }
    
    

    public Medico getMedico() {
        return medico;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public String getFecha() {
        return fecha;
    }

    public String getMotivo() {
        return motivo;
    }

    public String getSignos() {
        return signos;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

  

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    
    public void setFecha2(String fecha) {
        this.fecha = fecha;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public void setSignos(String signos) {
        this.signos = signos;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    @Override
    public String toString() {
        return "Cita{" + "medico=" + medico + ", paciente=" + paciente + ", fecha=" + fecha + ", motivo=" + motivo + ", signos=" + signos + ", diagnostico=" + diagnostico + ", estado=" + estado + ", prescripciones=" + prescripciones + ", Medicamentos=" + Medicamentos + ", codigo=" + codigo + '}';
    }

    

 
  
    
}
