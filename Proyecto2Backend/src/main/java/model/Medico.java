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
    String password;     //editable
    String especialidad; //editable
    float fee;           //editable
    String localidad;    //editable
    String clinica;      //editable
    String presentacion; //editable
    String estado;
    
    public Medico(Usuario user){
        super.setNombre(user.getNombre());
        super.setId(user.getId());
        super.setTipo(user.getTipo());
    }
    
    public Medico(String password, String especialidad, float fee, String localidad, String clinica, String fotoPath, String presentacion, String estado, String nombre, String id, String tipo) {
        super(nombre, id, tipo,fotoPath);
        this.password = password;
        this.especialidad = especialidad;
        this.fee = fee;
        this.localidad = localidad;
        this.clinica = clinica;
        this.presentacion = presentacion;
        this.estado = estado;
    }
    
    public Medico() {
        super("", "", "","");
        this.password = "";
        this.especialidad = "";
        this.fee = 0;
        this.localidad = "";
        this.clinica = "";
        this.fotoPath = "";
        this.presentacion = "";
        this.estado = "F";
    }
    

    public String getClinica() {
        return clinica;
    }

    public String getEstado() {
        return estado;
    }

    public void setClinica(String clinica) {
        this.clinica = clinica;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    @Override
    public String getNombre() {
        return nombre;
    }
    @Override
    public String getId() {
        return id;
    }
    @Override
    public String getTipo() {
        return tipo;
    }
    @Override
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    @Override
    public void setId(String id) {
        this.id = id;
    }
    @Override
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

    @Override
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
        return super.toString() +"Medico{" + "password=" + password + ", especialidad=" + especialidad + ", fee=" + fee + ", localidad=" + localidad + ", clinica=" + clinica + ", fotoPath=" + fotoPath + ", presentacion=" + presentacion + ", estado=" + estado + '}';
    }

    
    
    
    
    
}
