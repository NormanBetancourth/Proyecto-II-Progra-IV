/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package autentication.users;

import java.security.Principal;
import java.util.Arrays;
import java.util.HashSet;
import javax.enterprise.context.ApplicationScoped;
import javax.security.enterprise.AuthenticationStatus;
import javax.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import javax.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Usuario;

/**
 *
 * @author hector
 */
@ApplicationScoped
public class CustomAuthentication 
  implements HttpAuthenticationMechanism {

    //es un intermediario que verifica que el usuario este autenticado
    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest request,HttpServletResponse response,HttpMessageContext httpMsgContext) 
       {
           Usuario user=(Usuario) request.getSession().getAttribute("user");
           if(user!=null) //sveridica que haya un usuario autenticado
              return httpMsgContext.notifyContainerAboutLogin(
                new Principal() { @Override public String getName() { return user.getNombre();}},
                      //extrae el rol del usuario
                new HashSet<>(Arrays.asList(new String[]{user.getTipo()})));
           else
              return httpMsgContext.notifyContainerAboutLogin(
                new Principal() { @Override public String getName() { return "none";}},
                new HashSet<>());               
    }
}
