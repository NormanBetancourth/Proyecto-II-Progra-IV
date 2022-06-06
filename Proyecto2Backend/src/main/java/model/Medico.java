/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Medico extends Usuario {
    String password;
    String especialidad;
    float fee;
    String localidad;
    String fotoPath;
    String presentacion;
    //Horario

    public Medico(String nombre, String id, String tipo, String password, String especialidad, float fee, String localidad, String fotoPath, String presentacion) {
        super(nombre, id, tipo);
        this.password = password;
        this.especialidad = especialidad;
        this.fee = fee;
        this.localidad = localidad;
        this.fotoPath = fotoPath;
        this.presentacion = presentacion;
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

    
    
    public String getPassword() {
        return password;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public float getFee() {
        return fee;
    }

    public String getLocalidad() {
        return localidad;
    }

    public String getFotoPath() {
        return fotoPath;
    }

    public String getPresentacion() {
        return presentacion;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public void setFee(float fee) {
        this.fee = fee;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public void setFotoPath(String fotoPath) {
        this.fotoPath = fotoPath;
    }

    public void setPresentacion(String presentacion) {
        this.presentacion = presentacion;
    }

    @Override
    public String toString() {
        return super.toString() +"Medico{" + "password=" + password + ", especialidad=" + especialidad + ", fee=" + fee + ", localidad=" + localidad + ", fotoPath=" + fotoPath + ", presentacion=" + presentacion + ", horario=" + '}';
    }
    
    
    
    
    
    
}