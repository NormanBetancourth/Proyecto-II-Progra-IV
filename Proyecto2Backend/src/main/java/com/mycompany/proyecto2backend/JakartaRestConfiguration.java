package com.mycompany.proyecto2backend;

import javax.annotation.security.DeclareRoles;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * Configures Jakarta RESTful Web Services for the application.
 * @author Juneau
 */
@ApplicationPath("api")
@DeclareRoles({"Admin", "Medico"})
public class JakartaRestConfiguration extends Application {
}