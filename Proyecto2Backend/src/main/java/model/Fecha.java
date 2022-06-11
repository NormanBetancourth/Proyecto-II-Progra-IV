/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

/**
 *
 * @author norma
 */
public class Fecha {

    private LocalDateTime fechaHora;

    public Fecha() {
    }

    public Fecha(String fechaHora) {
        fechaHoraFormateada(fechaHora);
    }

    public Fecha creearFechaMasDias(int dias) {
        DateTimeFormatter dtf;
        dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
        return new Fecha(dtf.format(fechaHora.plusDays(dias)));
    }

    public String getDiaLiteral() {
        return fechaHora.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.getDefault());
    }

    public int getDiaDelMes() {
        return fechaHora.getDayOfMonth();
    }

    public int getDiaDelAnnio() {
        return fechaHora.getDayOfYear();
    }

    public String getMesLiteral() {
        return fechaHora.getMonth().getDisplayName(TextStyle.FULL, Locale.getDefault());
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(String fechaHora) {
        fechaHoraFormateada(fechaHora.toString());
    }

    public String getFecha() {
        return fechaHora.getDayOfWeek().toString() + ", " + fechaHora.getDayOfMonth() + " " + fechaHora.getMonth().name() + " " + fechaHora.getYear();
    }

    public String getFormatoddMMyyyy() { //"##/##/##"
        return fechaHora.getDayOfMonth() + "/" + fechaHora.getMonth() + "/" + fechaHora.getYear();
    }

    public String getFormatoyyyyMMdd() { //"##/##/##"
        return fechaHora.getYear() + "-" + fechaHora.getMonthValue() + "-" + fechaHora.getDayOfMonth();
    }

    public String getHora() {
        int hora = fechaHora.getHour();
        int min = fechaHora.getMinute();
        int seg = fechaHora.getSecond();
        return String.format("%d: %d: %d", hora, min, seg);
    }

    public String getHoraHHMMSS() {
        int hora = fechaHora.getHour();
        int min = fechaHora.getMinute();
        int seg = fechaHora.getSecond();
        return String.format("%d: %d: %d", hora, min, seg);
    }

    public String getHoraHHMM() {
        int hora = fechaHora.getHour();
        int min = fechaHora.getMinute();
        return hora + ":" + min + "";
    }

    public String getHoraHH() {
        int hora = fechaHora.getHour();
        return hora + "";
    }

    public String getHoraMM() {
        int min = fechaHora.getMinute();
        return min + "";
    }

    public String getFechaHoraSinFormato() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
        String strDate = dateFormat.format(fechaHora);
        return strDate;
    }

    public int getHoraSola() {
        return fechaHora.getHour();
    }

    public void fechaHoraFormateada(String fechaHora) { // "2020-09-12 09:40:30.00"
        DateTimeFormatter f = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
        LocalDateTime dateTime = LocalDateTime.parse(fechaHora, f);
        this.fechaHora = dateTime;
    }

    @Override
    public String toString() {
        return this.getFecha() + " " + this.getHora();
    }

}
