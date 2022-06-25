let backend = "http://localhost:8080/Proyecto2Backend/api";
let medicoRegistrado = {};
let paciente = {};
let header = '';
let semana = [];
let enabled = [];
let registered = [];
let cancelado = [];
let finalizado = [];
let diaHoraSeleccionada = {};
let frecuencia = '01:00';
const horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
             '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
             '16:00', '16:30', '17:00','17:30', '18:00', '18:30', '19:00', '19:30','20:00'];
let agenda = [];
let citas = [];
let pacientes = [];
let fechasCitas = new Map();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let nav = 0;
let clicked = null;
const schedule = document.querySelector('.grid-container');
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const modalBody = document.querySelector('#modal-body');
const modalFooter = document.querySelector('#modal-footer');
const calendarios = document.querySelector('.contenedor-calendarios');
const actualDay = document.querySelector('#weekly-monthDisplay');

function Load() {
  GetMedicoRegistrado();
  InitButtons();
  InitCalendar();
  AddEvents();
}

const GetMedicoRegistrado = async () =>{
  try {
      const req = new Request(backend+ '/session/current', {
          method: 'GET',
          headers: {}
        });

      const res = await fetch(req);
      if (!res.ok) {
        console.log("Error al guardar user de session");
      }
      medicoRegistrado = await res.json();
      GetHorario();
      GetPacientes();
      // console.log(medicoRegistrado);
  } catch (error) {
      console.log(error);
  }
};

function RetornaNumDia(dia) {
  let num = 0;
  switch(dia){
    case 'Lunes': num = 1; break;
    case 'Martes': num = 2; break;
    case 'Miercoles': num = 3; break;
    case 'Jueves': num = 4; break;
    case 'Viernes': num = 5; break;
  }
  return num;
}

const GetHorario = async () =>{
  try {
      const req = new Request(backend+ '/horarios/horario', {
          method: 'GET',
          headers: {}
        });

      const res = await fetch(req);
      if (!res.ok) {
          console.log("Error al leer el horario");
          return;
      }
      agenda = await res.json();
      frecuencia = agenda[0].frecuencia;
      // console.log(frecuencia);
      agenda.forEach(element => {
        element.num = RetornaNumDia(element.dia);
      });
      LoadActualWeek();
      // console.log(agenda);
  } catch (error) {
      console.log(error);
  }
};  


const GetPacientes = async () =>{
  try {
      const req = new Request(backend+ '/pacientes/' + medicoRegistrado.id , {
          method: 'GET',
          headers: {}
        });

      const res = await fetch(req);
      if (!res.ok) {
          console.log("Error al leer los pacientes");
          return;
      }
      pacientes = await res.json();
      // console.log(pacientes);
  } catch (error) {
      console.log(error);
  }
};

function RetornaHoraDeCita(cita) {
  // console.log(cita[0].fecha.substring(11, 16))
  return cita.fecha.substring(11, 16);
}

function RetornaFechaDeCita(cita) {
  // console.log(cita.fecha.substring(0, 11));
  return cita.fecha.substring(0, 10);
}

const GetCitas = async () =>{
  for (const [key, value] of fechasCitas.entries()) {
    // console.log(key, value);
    try {
      // console.log(value);
      const req = new Request(backend+ '/citas/' +  fechasCitas.get(key), {
          method: 'GET',
          headers: {}
        });

      // Lee citas pero falta revisar en caso que no existan citas para una fecha
      const res = await fetch(req);
      if (!res.ok) {
          console.log("Error al leer las citas");
      }
      let cita = await res.json();
      // console.log(cita);
        cita.forEach(element => {
          element.hora = RetornaHoraDeCita(element);
          element.fecha = RetornaFechaDeCita(element);
          
          // console.log(element);
          citas.push(element);
        });
    } catch (error) {
      console.log(error);
    }  
  }  
  LoadCitas();
  //console.log(citas);
};

function LoadCitas() {

  enabled.forEach(element => {
    // console.log(element);
    citas.forEach(cita => {
      // console.log(cita);
      if(cita.fecha === element.getAttribute('data-read') && cita.hora === element.getAttribute('data-time')) {
        // console.log(cita.estado);
        // codigo, idmedico, idpaciente, fecha_hora, estado, signos, motivo, diagnostico, prescripcion, medicamentos
        element.setAttribute('data-numero', cita.codigo);
        element.setAttribute('data-estado', cita.estado);
        element.setAttribute('data-medico', cita.medico.id);
        element.setAttribute('data-nombre-medico', cita.medico.nombre);
        element.setAttribute('data-motivo', cita.motivo);
        element.setAttribute('data-paciente', cita.paciente.id);
        element.setAttribute('data-diag', cita.diagnostico);
        element.setAttribute('data-signos', cita.signos);
        element.setAttribute('data-pres', cita.prescripciones);
        element.setAttribute('data-med', cita.medicamentos);
        element.setAttribute('data-nombre-pac', cita.paciente.nombre);
        if(element.getAttribute('data-estado') === 'Registrado') {
          element.classList.remove('enableHourAppointment');
          element.textContent  = 'Atender Cita';
          element.classList.add('citaRegistrada');
        }
        else {
          if(element.getAttribute('data-estado') === 'Finalizado') {
            element.classList.remove('enableHourAppointment');
            element.textContent  = 'Cita Finalizada';
            element.classList.add('citaFinalizada');
          }
          else {
            if(element.getAttribute('data-estado') === 'Cancelado') {
              element.textContent  = 'Cita Cancelada';
              element.classList.remove('enableHourAppointment');
              element.classList.add('citaCancelada');
            }
          }
        }
      }
    });
  });
 

  Array.from(document.querySelectorAll('.enableHourAppointment')).forEach(element => {
    element.textContent  = 'Registrar Cita';
  });
}

function EnableHoursAppointments() {
  const horasCitas = Array.from(document.querySelectorAll('.horaCita'));
  let rango = CalculateRanges();

  horasCitas.forEach(element => {
    // console.log(rango);
    if(rango.has(element.getAttribute('data-day'))){
      // console.log(rango.get(element.getAttribute('data-day')));
      // console.log(element.getAttribute('data-time'));
      if(rango.get(element.getAttribute('data-day')).includes(element.getAttribute('data-time'))){
        // console.log(element.getAttribute('data-time'));
        fechasCitas.set(weekdays.indexOf(element.getAttribute('data-day')),element.getAttribute('data-read'));
        element.setAttribute('data-bs-toggle', 'modal');
        element.setAttribute('data-bs-target', "#reg-modal");
        element.classList.add('enableHourAppointment');
        element.classList.remove('grid-item');
        enabled.push(element);
        // console.log(element);
      }
    }
  });
  //console.log(fechasCitas);
  GetCitas();

}

function numMenor(num) {
  if(num <= 9) {
    return true;
  } 
  return false;
}

function CalculateRanges() {
  let horasPorDia = new Map();
  let rangoMayor = '';
  let rangoMenor = '';
  let frec = '';
  let dia = '';

  agenda.forEach(horario => {
    rangoMayor = horario.horaFinal.substring(0,2);
    rangoMenor = horario.horaInicio.substring(0,2);
    frec = frecuencia.substring(2,5);
    // console.log(frec);
    dia = weekdays[horario.num];
    let lista = [];
    if(frec === ':00'){
      while(rangoMayor >= rangoMenor){
        lista.push(numMenor(rangoMayor) ?  '0' + rangoMayor + frec : rangoMayor + frec);
        rangoMayor -= 1;
      }
      // console.log(lista);
      horasPorDia.set(dia, lista);
    }
    else{
      while(rangoMayor >= rangoMenor){
        lista.push(rangoMayor + numMenor(rangoMayor) ?  '0' + rangoMayor + ':00' : rangoMayor + ':00');
        lista.push(numMenor(rangoMayor) ?  '0' + rangoMayor + frec : rangoMayor + frec);
        rangoMayor -= 1;
      }
      // console.log(lista);
      horasPorDia.set(dia, lista);
    }
  });
  // console.log(horasPorDia);
  return horasPorDia;
}

Date.prototype.GetLastSaturday = function() {
    let d = new Date(this.valueOf());
    d.setDate(d.getDate() - (d.getDay() + 1));
    return d;
}

Date.prototype.GetNextSaturday = function() {
  let resultDate = new Date(this.valueOf());
  resultDate.setDate(resultDate.getDate() + (7 + 5 - resultDate.getDay()) % 6);
  return resultDate;
}

Date.prototype.GetLastSunday = function() {
  let dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() - (dat.getDay() || 7));
  return dat;
}


function InitButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    InitCalendar();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    InitCalendar();
  });
}

function ReturnNumber(number) {
  if(number <= 9) {
    return '0' + String(number);
  }
  return number;
}

function LoadDays() {
  let line = '';
  if( semana.length > 0) {
    if(frecuencia === '01:00'){
      for(let i = 0; i <= 25; i+=2){
        const hora = document.createElement('div');
        hora.textContent = horas[i];
        hora.classList.add('grid-item');
        hora.classList.add('hora');
        const appointment1 = document.createElement('div');
        appointment1.classList.add('grid-item');
        appointment1.classList.add('horaCita');
        //appointment1.classList.add(weekdays[1]);
        //appointment1.classList.add(horas[i]);
        //appointment1.textContent = horas[i] + '-' + semana[0].toDateString();
        appointment1.setAttribute('data-day', weekdays[1]);
        appointment1.setAttribute('data-time', horas[i]);
        appointment1.setAttribute('data-date', semana[0].toDateString());
        appointment1.setAttribute('data-infor', horas[i] + '-' + semana[0].toDateString());
        appointment1.setAttribute('data-read',semana[0].getFullYear() + '-' + ReturnNumber(semana[0].getMonth() + 1) + '-' + semana[0].getDate());
        const appointment2 = document.createElement('div');
        appointment2.classList.add('grid-item');
        appointment2.classList.add('horaCita');
        //appointment2.classList.add(weekdays[2]);
        //appointment2.classList.add(horas[i]);
        //appointment2.textContent = horas[i] + '-' + semana[1].toDateString();
        appointment2.setAttribute('data-day', weekdays[2]);
        appointment2.setAttribute('data-time', horas[i]);
        appointment2.setAttribute('data-date', semana[1].toDateString());
        appointment2.setAttribute('data-infor', horas[i] + '-' + semana[1].toDateString());
        appointment2.setAttribute('data-read',semana[1].getFullYear() + '-' + ReturnNumber(semana[1].getMonth() + 1) + '-' + semana[1].getDate());
        const appointment3 = document.createElement('div');
        appointment3.classList.add('grid-item');
        appointment3.classList.add('horaCita');
        //appointment3.classList.add(weekdays[3]);
        //appointment3.classList.add(horas[i]);
        //appointment3.textContent = horas[i] + '-' + semana[2].toDateString();
        appointment3.setAttribute('data-day', weekdays[3]);
        appointment3.setAttribute('data-time', horas[i]);
        appointment3.setAttribute('data-date', semana[2].toDateString());
        appointment3.setAttribute('data-infor', horas[i] + '-' + semana[2].toDateString());
        appointment3.setAttribute('data-read',semana[2].getFullYear() + '-' + ReturnNumber(semana[2].getMonth() + 1) + '-' + semana[2].getDate());
        const appointment4 = document.createElement('div');
        appointment4.classList.add('grid-item');
        appointment4.classList.add('horaCita');
        //appointment4.classList.add(weekdays[4]);
        //appointment4.classList.add(horas[i]);
        //appointment4.textContent = horas[i] + '-' + semana[3].toDateString();
        appointment4.setAttribute('data-day', weekdays[4]);
        appointment4.setAttribute('data-time', horas[i]);
        appointment4.setAttribute('data-date', semana[3].toDateString());
        appointment4.setAttribute('data-infor', horas[i] + '-' + semana[3].toDateString());
        appointment4.setAttribute('data-read',semana[3].getFullYear() + '-' + ReturnNumber(semana[3].getMonth() + 1) + '-' + semana[3].getDate());
        const appointment5 = document.createElement('div');
        appointment5.classList.add('grid-item');
        appointment5.classList.add('horaCita');
        //appointment5.classList.add(weekdays[5]);
        //appointment5.classList.add(horas[i]);
        //appointment5.textContent = horas[i] + '-' + semana[4].toDateString();
        appointment5.setAttribute('data-day', weekdays[5]);
        appointment5.setAttribute('data-time', horas[i]);
        appointment5.setAttribute('data-date', semana[4].toDateString());
        appointment5.setAttribute('data-infor', horas[i] + '-' + semana[4].toDateString());
        appointment5.setAttribute('data-read',semana[4].getFullYear() + '-' + ReturnNumber(semana[4].getMonth() + 1) + '-' + semana[4].getDate());
    
        line += hora.outerHTML;
        line += appointment1.outerHTML;
        line += appointment2.outerHTML;
        line += appointment3.outerHTML;
        line += appointment4.outerHTML;
        line += appointment5.outerHTML;
      }
      //console.log(semana);
      schedule.innerHTML = line;
    }
    else {
      for(let i = 0; i < 25; i++){
          const hora = document.createElement('div');
          hora.textContent = horas[i];
          hora.classList.add('grid-item');
          hora.classList.add('hora');
          const appointment1 = document.createElement('div');
          appointment1.classList.add('grid-item');
          appointment1.classList.add('horaCita');
          //appointment1.classList.add(weekdays[1]);
          //appointment1.classList.add(horas[i]);
          //appointment1.textContent = horas[i] + '-' + semana[0].toDateString();
          appointment1.setAttribute('data-day', weekdays[1]);
          appointment1.setAttribute('data-time', horas[i]);
          appointment1.setAttribute('data-date', semana[0].toDateString());
          appointment1.setAttribute('data-infor', horas[i] + '-' + semana[0].toDateString());
          appointment1.setAttribute('data-read',semana[0].getFullYear() + '-' + ReturnNumber(semana[0].getMonth() + 1) + '-' + semana[0].getDate());
          const appointment2 = document.createElement('div');
          appointment2.classList.add('grid-item');
          appointment2.classList.add('horaCita');
          //appointment2.classList.add(weekdays[2]);
          //appointment2.classList.add(horas[i]);
          //appointment2.textContent = horas[i] + '-' + semana[1].toDateString();
          appointment2.setAttribute('data-day', weekdays[2]);
          appointment2.setAttribute('data-time', horas[i]);
          appointment2.setAttribute('data-date', semana[1].toDateString());
          appointment2.setAttribute('data-infor', horas[i] + '-' + semana[1].toDateString());
          appointment2.setAttribute('data-read',semana[1].getFullYear() + '-' + ReturnNumber(semana[1].getMonth() + 1) + '-' + semana[1].getDate());
          const appointment3 = document.createElement('div');
          appointment3.classList.add('grid-item');
          appointment3.classList.add('horaCita');
          //appointment3.classList.add(weekdays[3]);
          //appointment3.classList.add(horas[i]);
          //appointment3.textContent = horas[i] + '-' + semana[2].toDateString();
          appointment3.setAttribute('data-day', weekdays[3]);
          appointment3.setAttribute('data-time', horas[i]);
          appointment3.setAttribute('data-date', semana[2].toDateString());
          appointment3.setAttribute('data-infor', horas[i] + '-' + semana[2].toDateString());
          appointment3.setAttribute('data-read',semana[2].getFullYear() + '-' + ReturnNumber(semana[2].getMonth() + 1) + '-' + semana[2].getDate());
          const appointment4 = document.createElement('div');
          appointment4.classList.add('grid-item');
          appointment4.classList.add('horaCita');
          //appointment4.classList.add(weekdays[4]);
          //appointment4.classList.add(horas[i]);
          //appointment4.textContent = horas[i] + '-' + semana[3].toDateString();
          appointment4.setAttribute('data-day', weekdays[4]);
          appointment4.setAttribute('data-time', horas[i]);
          appointment4.setAttribute('data-date', semana[3].toDateString());
          appointment4.setAttribute('data-infor', horas[i] + '-' + semana[3].toDateString());
          appointment4.setAttribute('data-read',semana[3].getFullYear() + '-' + ReturnNumber(semana[3].getMonth() + 1) + '-' + semana[3].getDate());
          const appointment5 = document.createElement('div');
          appointment5.classList.add('grid-item');
          appointment5.classList.add('horaCita');
          //appointment5.classList.add(weekdays[5]);
          //appointment5.classList.add(horas[i]);
          //appointment5.textContent = horas[i] + '-' + semana[4].toDateString();
          appointment5.setAttribute('data-day', weekdays[5]);
          appointment5.setAttribute('data-time', horas[i]);
          appointment5.setAttribute('data-date', semana[4].toDateString());
          appointment5.setAttribute('data-infor', horas[i] + '-' + semana[4].toDateString());
          appointment5.setAttribute('data-read',semana[4].getFullYear() + '-' + ReturnNumber(semana[4].getMonth() + 1) + '-' + semana[4].getDate());
      
          line += hora.outerHTML;
          line += appointment1.outerHTML;
          line += appointment2.outerHTML;
          line += appointment3.outerHTML;
          line += appointment4.outerHTML;
          line += appointment5.outerHTML;
        }
        //console.log(semana);
        schedule.innerHTML = line;
      }
  }
}

function LoadActualWeek() {
  semana = [];
  const dt = new Date();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  let ultimoDomingo = dt.GetLastSunday();
  let siguienteSabado = dt.GetNextSaturday();

  const firstDayOfMonth = new Date(year, month, 1);  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const padding = weekdays.indexOf(dateString.split(', ')[0]);

  if(ultimoDomingo.getDate() >= dt.getDate()){
    //console.log(siguienteSabado.getDate());
    for(let j = -(padding); siguienteSabado.getDate() > j; j++){
      semana.push(new Date(year, month, j + 1));
      //console.log(new Date(yearClicked, monthClicked, j));
    }
    for(let i = 1; i < semana.length - 1; i++){
      //console.log(semana[i]);
      //console.log(semana[i].getDay());
      document.querySelector('.'+ weekdays[i]).textContent = semana[i].toDateString();
   }
  }
  else{
    if(siguienteSabado.getDate() < dt.getDate()){
      const limiteDias = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
      for(let j = ultimoDomingo.getDate() + 1; j  < (limiteDias + siguienteSabado.getDate()); j++){
        semana.push(new Date(year, month, j));
        console.log(new Date(year, month, j));
      }
      for(let i = 0; i < semana.length; i++){
        //console.log(semana[i]);
        document.querySelector('.'+ weekdays[i + 1]).textContent = semana[i].toDateString();
     }
    }
    else{
      for(let j = ultimoDomingo.getDate() + 1; j < siguienteSabado.getDate(); j++){
        semana.push(new Date(year, month, j));
        //console.log(new Date(yearClicked, monthClicked, j));
      }
     for(let i = 0; i < semana.length; i++){
      //console.log(semana[i]);
      document.querySelector('.'+ weekdays[i + 1]).textContent = semana[i].toDateString();
      }
    } 
  }
  LoadDays();
  EnableHoursAppointments();
  //console.log(semana);
}

function LoadWeek() {
  $(document).click(function(event) {
    semana = [];
    let dayClicked = $(event.target).attr('data-day');
    let monthClicked = $(event.target).attr('data-month');
    let yearClicked = $(event.target).attr('data-year');
    let paddingClicked = $(event.target).attr('data-padding');

    //console.log('prueba: ' + paddingClicked);

    let fechaPrueba = new Date(yearClicked, monthClicked, dayClicked);

    // get fecha del ultimo domingo
    let ultimoDomingo = new Date(fechaPrueba).GetLastSunday();
    //console.log('Ultimo dom: ' + ultimoDomingo.getDate());

    // get fecha del ultimo sabado
    let ultimoSabado = new Date(fechaPrueba).GetLastSaturday();
    //console.log('Ultimo sab: ' + ultimoSabado.getDate());

    // get fecha del siguiente sabado
    let siguienteSabado = new Date(fechaPrueba).GetNextSaturday();
    //console.log('Siguiente sab: ' + siguienteSabado.getDate());

    // Si la semana seleccionada es la primera semana del mes
    if(ultimoDomingo.getDate() > fechaPrueba.getDate()){
      //console.log(siguienteSabado.getDate());
      for(let j = -(paddingClicked); siguienteSabado.getDate() > j; j++){
        semana.push(new Date(yearClicked, monthClicked, j + 2));
        console.log(new Date(yearClicked, monthClicked, j + 2));
      }
      // Se escriben las fechas de los días
      console.log(semana);
      for(let i = 0; i < (semana.length - 2); i++){
        //console.log(semana[i]);
        //console.log(semana[i].getDay());
        document.querySelector('.'+ weekdays[i + 1]).textContent = semana[i].toDateString();
     }
    }
    else{
      // Si la semana seleccionada es la última del mes
      if(siguienteSabado.getDate() < fechaPrueba.getDate()){
        const limiteDias = new Date(fechaPrueba.getFullYear(), fechaPrueba.getMonth() + 1, 0).getDate();
        for(let j = ultimoDomingo.getDate() + 1; j  < (limiteDias + siguienteSabado.getDate()); j++){
          semana.push(new Date(yearClicked, monthClicked, j));
          console.log(new Date(yearClicked, monthClicked, j));
        }
        // Se escriben las fechas de los días
        for(let i = 0; i < semana.length; i++){
          //console.log(semana[i]);
          document.querySelector('.'+ weekdays[i + 1]).textContent = semana[i].toDateString();
       }
      }
      else{
        // Si la semana seleccionada no es la primera ni última del mes
        for(let j = ultimoDomingo.getDate() + 1; j < siguienteSabado.getDate(); j++){
          semana.push(new Date(yearClicked, monthClicked, j));
          //console.log(new Date(yearClicked, monthClicked, j));
        }
        // Se escriben las fechas de los días
       for(let i = 0; i < semana.length; i++){
        //console.log(semana[i]);
        document.querySelector('.'+ weekdays[i + 1]).textContent = semana[i].toDateString();
        }
      } 
    }
    LoadDays();
    EnableHoursAppointments();
    //console.log(semana);
  } 
  );
}

function LoadInforModal(event) { 
  if(event.relatedTarget.getAttribute('data-estado') === 'Finalizado') {
    modalBody.innerHTML = `
    <div class="form-group">
      <form>
        <div>
        <label>Numero de cita</label>
        <input type="text" class="form-control" id='numero-cita' value='${event.relatedTarget.getAttribute('data-numero')}' readonly>
        <label>Identificación del médico</label>
        <input type="text" class="form-control" id='medico-id-cita' value='${event.relatedTarget.getAttribute('data-medico')}' readonly>
        <label>Nombre del médico</label>
        <input type="text" class="form-control" id='medico-nombre-cita' value='${event.relatedTarget.getAttribute('data-nombre-medico')}' readonly>
        <label>Fecha</label>
        <input type="text" class="form-control" id='fecha-cita' value='${event.relatedTarget.getAttribute('data-read')}' readonly>
        <label>Hora</label>
        <input type="text" class="form-control" id='hora-cita' value='${event.relatedTarget.getAttribute('data-time')}' readonly>
        <label>Paciente</label>
        <input type="text" class="form-control" id='paciente-cita' value='${event.relatedTarget.getAttribute('data-nombre-pac') + ', ' + event.relatedTarget.getAttribute('data-paciente')}'  readonly>
        <label>Motivo</label>
        <input type="text" class="form-control" id='motivo-cita' value='${event.relatedTarget.getAttribute('data-motivo')}' readonly>
        <label>Signos</label>
        <input type="text" class="form-control" id='signos-cita' value='${event.relatedTarget.getAttribute('data-signos')}' readonly>
        <label>Diagnostico</label>
        <input type="text" class="form-control" id='diagnostico-cita' value='${event.relatedTarget.getAttribute('data-diag')}' readonly>
        <label>Prescripción</label>
        <input type="text" class="form-control" id='pres-cita' value='${event.relatedTarget.getAttribute('data-pres')}' readonly>
        <label>Medicamentos</label>
        <input type="text" class="form-control" id='medicamentos-cita' value='${event.relatedTarget.getAttribute('data-med')}' readonly>
        </div>
      </form>
    </div>
    `;
    modalFooter.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
    `;
  }
  else {
      if(event.relatedTarget.getAttribute('data-estado') === 'Registrado') {    
        modalBody.innerHTML = `
        <div class="form-group">
          <form>
            <div>
            <label>Numero de cita</label>
            <input type="text" class="form-control" id='numero-cita' value='${event.relatedTarget.getAttribute('data-numero')}' readonly>
            <label>Identificación del médico</label>
            <input type="text" class="form-control" id='medico-id-cita' value='${event.relatedTarget.getAttribute('data-medico')}' readonly>
            <label>Nombre del médico</label>
            <input type="text" class="form-control" id='medico-nombre-cita' value='${event.relatedTarget.getAttribute('data-nombre-medico')}' readonly>
            <label>Fecha</label>
            <input type="text" class="form-control" id='fecha-cita' value='${event.relatedTarget.getAttribute('data-read')}' readonly>
            <label>Hora</label>
            <input type="text" class="form-control" id='hora-cita' value='${event.relatedTarget.getAttribute('data-time')}' readonly>
            <label>Paciente</label>
            <input type="text" class="form-control" id='paciente-cita' value='${event.relatedTarget.getAttribute('data-nombre-pac') + ', ' + event.relatedTarget.getAttribute('data-paciente')}'  readonly>
            <label>Motivo</label>
            <input type="text" class="form-control" id='motivo-cita' value='${event.relatedTarget.getAttribute('data-motivo')}' readonly>
            <label>Signos</label>
            <input type="text" class="form-control" id='signos-cita' required>
            <label>Diagnostico</label>
            <input type="text" class="form-control" id='diagnostico-cita' required>
            <label>Prescripción</label>
            <input type="text" class="form-control" id='pres-cita' required>
            <label>Medicamentos</label>
            <input type="text" class="form-control" id='medicamentos-cita' required>
            </div>
            </div>
          </form>
        </div>
        `;
    
        modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" id="cancel-button" data-bs-dismiss="modal" >Cancelar</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" id="send-button">Enviar</button>
        `;

        $('#cancel-button').on('click', CancelarCita);
        $('#send-button').on('click', AtenderCita);

      }
      else {
        if(event.relatedTarget.getAttribute('data-estado') === 'Cancelado') {  
          modalBody.innerHTML = `
          <div class="form-group">
            <form>
              <div>
              <label>Numero de cita</label>
              <input type="text" class="form-control" id='numero-cita' value='${event.relatedTarget.getAttribute('data-numero')}' readonly>
              <label>Identificación del médico</label>
              <input type="text" class="form-control" id='medico-id-cita' value='${event.relatedTarget.getAttribute('data-medico')}' readonly>
              <label>Nombre del médico</label>
              <input type="text" class="form-control" id='medico-nombre-cita' value='${event.relatedTarget.getAttribute('data-nombre-medico')}' readonly>
              <label>Fecha</label>
              <input type="text" class="form-control" id='fecha-cita' value='${event.relatedTarget.getAttribute('data-read')}' readonly>
              <label>Hora</label>
              <input type="text" class="form-control" id='hora-cita' value='${event.relatedTarget.getAttribute('data-time')}' readonly>
              <label>Paciente</label>
              <input type="text" class="form-control" id='paciente-cita' value='${event.relatedTarget.getAttribute('data-nombre-pac') + ', ' + event.relatedTarget.getAttribute('data-paciente')}'  readonly>
              <label>Motivo</label>
              <input type="text" class="form-control" id='motivo-cita' value='${event.relatedTarget.getAttribute('data-motivo')}' readonly>
              <label>Signos</label>
              <input type="text" class="form-control" id='signos-cita' readonly>
              <label>Diagnostico</label>
              <input type="text" class="form-control" id='diagnostico-cita' readonly>
              <label>Prescripción</label>
              <input type="text" class="form-control" id='pres-cita' readonly>
              <label>Medicamentos</label>
              <input type="text" class="form-control" id='medicamentos-cita' readonly>
              </div>
              </div>
            </form>
          </div>
          `;
          modalFooter.innerHTML = `
          <button type="button" class="btn btn-secondary" id="cancel-button" data-bs-dismiss="modal" >Cerrar</button>
          `;
        }    
        else {
          let line = '';

          const select = document.createElement('select');
          select.classList.add('custom-select');
          select.setAttribute('id', 'inputGroupSelect01');
        
          pacientes.forEach((element) => {
            const option = document.createElement('option');
            option.setAttribute('value', element.id);
            option.textContent = element.nombre + ', ' + element.id;
            line += option.outerHTML;
          });
          modalBody.innerHTML = `
          <div class="form-group">
            <form>
              <div>
              <label>Numero de cita</label>
              <input type="text" class="form-control" id='numero-cita'required>      
              <label>Identificación del médico</label>
              <input type="text" class="form-control" id='medico-id-cita' value=${medicoRegistrado.id} readonly>
              <label>Nombre del médico</label>
              <input type="text" class="form-control" id='medico-nombre-cita' value=${medicoRegistrado.nombre} readonly>
              <label>Fecha</label>
              <input type="text" class="form-control" id='fecha-cita' value='${event.relatedTarget.getAttribute('data-read')}' readonly>
              <label>Hora</label>
              <input type="text" class="form-control" id='hora-cita' value='${event.relatedTarget.getAttribute('data-time')}' readonly>
              <label>Motivo</label>
              <input type="text" class="form-control" id='motivo-cita' required>
              </div>
              </div>
            </form>
          </div>
          <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text mt-3" for="inputGroupSelect01">Paciente</label>
          </div>
          <select class="custom-select mt-3" id="inputGroupSelect01" required>
            <option value='' id='seleccionar' selected disabled>Seleccionar...</option>
            ${line}
          </select>
          `;
          
      
          modalFooter.innerHTML = `
          <button type="button" class="btn btn-secondary" id="cancel-button" data-bs-dismiss="modal" >Cerrar</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" id="accept-button">Enviar</button>
          `;
          $('#accept-button').on('click', RegistrarCita);
        }
      }
    }
}

const AtenderCita = async () => {
  let cita = {
    paciente: await CargarPacientePorId($('#paciente-cita').val().split(', ')[1]),
    codigo: $('#numero-cita').val(),
    medico: medicoRegistrado,
    fecha: $('#fecha-cita').val() + 'T' + $('#hora-cita').val() + ':00',
    motivo: $('#motivo-cita').val(),
    signos: $('#signos-cita').val(),
    diagnostico: $('#diagnostico-cita').val(),
    estado: "Finalizado",
    prescripciones: $('#pres-cita').val(),
    medicamentos: $('#medicamentos-cita').val(),
  };
  console.log(cita);

  await citasAcept(cita);
}

const citasAcept = async (cita) => {
  const req = new Request(backend + "/citas/atender/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al atender cita");
      return;
    }
    document.location.reload();
    console.log("Se da por atendida la cita");
  } catch (error) {
    console.log(error);
  }

};


const CancelarCita = async () => {
  let cita = {
    paciente: await CargarPacientePorId($('#paciente-cita').val().split(', ')[1]),
    medico: medicoRegistrado,
    codigo:  $('#numero-cita').val(),
    fecha: $('#fecha-cita').val() + 'T' + $('#hora-cita').val() + ':00',
    motivo: $('#motivo-cita').val(),
    signos: "",
    diagnostico: "",
    estado: "R",
    prescripciones: "",
    Medicamentos: "",
  };
  console.log(cita);

  await citasDELETE(cita.codigo);
}

const citasDELETE = async (id) => {
  const req = new Request(backend + "/citas/cancelar/"+id, {
    method: "POST",
    headers: {}
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al cancelar cita");
      return;
    }
    document.location.reload();
    console.log("Se cancela la cita");
  } catch (error) {
    console.log(error);
  }

};



const CargarPacientePorId = async (id) => {
  try {
    const req = new Request(backend + "/pacientes/data/" + id, {
      method: "GET",
      headers: {},
    });

    console.log(req);
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al guardad user de session");
      return;
    }
    paciente = await res.json();
    return paciente;
  } catch (error) {
    console.log(error);
  }
};

const RegistrarCita = async () => {

  let cita = {
    paciente: await CargarPacientePorId($('#inputGroupSelect01').find(":selected").text().split(', ')[1]),
    medico: medicoRegistrado,
    codigo:  $('#numero-cita').val(),
    fecha: $('#fecha-cita').val() + 'T' + $('#hora-cita').val() + ':00',
    motivo: $('#motivo-cita').val(),
    signos: "",
    diagnostico: "",
    estado: "Registrado",
    prescripciones: "",
    Medicamentos: "",
  };
  console.log(cita);

  await CitasPOST(cita);
}

const CitasPOST = async (cita) => {
  const req = new Request(backend + "/citas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error agregar una cita");
      return;
    }
    console.log("Se inserta la cita");
    document.location.reload();
  } catch (error) {
    console.log(error);
  }
};


function AddEvents() {
  document.querySelectorAll('div .day-active').forEach(element => {
    element.addEventListener('click', LoadWeek);
  });
  $(document).on('show.bs.modal', modalBody, LoadInforModal);
  $('#send-button').on('click', AtenderCita);
};


function InitCalendar() {
  const dt = new Date();
  header =  dt.toDateString();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    let line = '';
    calendar.innerHTML = '';

  for(let i = 2; i <= paddingDays + daysInMonth; i++) {
    
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    daySquare.setAttribute('data-padding', paddingDays);
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      daySquare.classList.add('day-active');
      daySquare.setAttribute('data-day', i - paddingDays);
      daySquare.setAttribute('data-month', month);
      daySquare.setAttribute('data-year', year);

      if (i - paddingDays === day && nav === 0) {
          daySquare.id = 'currentDay';
        }
      } else {
      daySquare.classList.add('padding');
    }
    line += daySquare.outerHTML;
  }
  calendar.innerHTML += line;
  document.querySelector('#weekly-header').innerHTML = header;
}

document.addEventListener("DOMContentLoaded", Load);