/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author norma
 */
public class Administrador extends Usuario{
    
    String password;

    public Administrador(String nombre, String id, String tipo, String password) {
        super(nombre, id, tipo,"");
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return super.toString() +"Administrador{" + "password=" + password + '}';
    }
    
    
    
}
