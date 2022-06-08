/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model.DAO.General;

import model.Medico;
import model.Usuario;

/**
 *
 * @author Dell
 */
public class principalPruebaDAO {
    public static void main (String [ ] args) {
        GeneralHandler gen = new GeneralHandler();
        //prueba de retornar usuario BD exitosa
        Usuario user = gen.retornaUserPorId("100");
        //prueba de retornar medico BD exitosa
        Medico med = gen.retornaMedicoPorId("101");
        System.out.println(user.toString());
        System.out.println(med.toString());
    }
}
