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
    Fecha fecha;
    String motivo;
    String signos;
    String diagnostico;
    String estado;
    String prescripciones;
    String Medicamentos;    

    public Cita(Medico medico, Paciente paciente, Fecha fecha, String motivo, String signos, String diagnostico, String estado, String prescripciones, String Medicamentos) {
        this.medico = medico;
        this.paciente = paciente;
        this.fecha = fecha;
        this.motivo = motivo;
        this.signos = signos;
        this.diagnostico = diagnostico;
        this.estado = estado;
        this.prescripciones = prescripciones;
        this.Medicamentos = Medicamentos;
    }

    public String getEstado() {
        return estado;
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
    }
    
    

    public Medico getMedico() {
        return medico;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Fecha getFecha() {
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

    public void setFecha(Fecha fecha) {
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

 
  
    
}
