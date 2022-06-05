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
    ArrayList<String> prescripciones;
    ArrayList<String> Medicamentos;    

    public Cita(Medico medico, Paciente paciente, Fecha fecha, String motivo, String signos, String diagnostico, ArrayList<String> prescripciones, ArrayList<String> Medicamentos) {
        this.medico = medico;
        this.paciente = paciente;
        this.fecha = fecha;
        this.motivo = motivo;
        this.signos = signos;
        this.diagnostico = diagnostico;
        this.prescripciones = prescripciones;
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

    public ArrayList<String> getPrescripciones() {
        return prescripciones;
    }

    public ArrayList<String> getMedicamentos() {
        return Medicamentos;
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

    public void setPrescripciones(ArrayList<String> prescripciones) {
        this.prescripciones = prescripciones;
    }

    public void setMedicamentos(ArrayList<String> Medicamentos) {
        this.Medicamentos = Medicamentos;
    }

    @Override
    public String toString() {
        return "Cita{" + "medico=" + medico + ", paciente=" + paciente + ", fecha=" + fecha + ", motivo=" + motivo + ", signos=" + signos + ", diagnostico=" + diagnostico + ", prescripciones=" + prescripciones + ", Medicamentos=" + Medicamentos + '}';
    }
    
}
