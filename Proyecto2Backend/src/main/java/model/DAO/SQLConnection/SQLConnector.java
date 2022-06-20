package model.DAO.SQLConnection;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLConnector {
    private static SQLConnector instance;
    private Connection dbConn;
    private String URL = "jdbc:sqlserver://localhost:1433;databaseName=MedicosDB;"; // localhost = 127.0.0.1

    // Constructor privado
    private SQLConnector(String user, String password) {
        try{
            // Usa el JAR para realizar la conexión con los parámetros dados
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            dbConn = DriverManager.getConnection(URL, user, password);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    //Obtener la conexión
    public Connection getConnection() {
        return dbConn;
    }

    public static SQLConnector getInstance(String user, String password)throws SQLException {
        if(instance == null){
            instance = new SQLConnector(user,password);
        }
        else if(instance.getConnection().isClosed()){
            instance = new SQLConnector(user, password);
        }
        return instance;
    }

    public void cierra(){
        if(dbConn != null) {
            try {
                dbConn.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }

}
