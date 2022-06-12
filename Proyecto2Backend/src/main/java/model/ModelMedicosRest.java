/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Dell
 */
public class ModelMedicosRest {
    List array;
    
    
    public ModelMedicosRest(){
        array = new ArrayList();
    }
    
    public void add(String obj){
        array.add(obj);
    }
    
    public List getArray(){
        return array;
    }
    
    public String imprimirArray(){
        String actions = "";
            for(int i = 0; i < array.size(); i++) {
            actions+=array.get(i)+"\n";
        }
            return actions;
    }
}
