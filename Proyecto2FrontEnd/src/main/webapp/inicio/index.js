let backend = "http://localhost:8080/Proyecto2Backend/api";
let medicoRegistrado = {};
let header = '';
let semana = [];
let diaHoraSeleccionada = {};
let frecuencia = '01:00';
const horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
             '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
             '16:00', '16:30', '17:00','17:30', '18:00', '18:30', '19:00', '19:30','20:00'];
let agenda = [];
let citas = [];
let pacientes = [];
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
      console.log(medicoRegistrado);
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
      console.log(frecuencia);
      agenda.forEach(element => {
        element.num = RetornaNumDia(element.dia);
      });
      LoadActualWeek();
      console.log(agenda);
  } catch (error) {
      console.log(error);
  }
};  

const GetCitas = async () =>{
  // horario.forEach(element => {
  //   try {
  //     const req = new Request(backend+ '/citas/' + element.fecha, {
  //         method: 'GET',
  //         headers: {}
  //       });

  //     const res = await fetch(req);
  //     if (!res.ok) {
  //         console.log("Error al leer el horario");
  //         return;
  //     }
  //     // agenda = await res.json();
  //     let p = await res.json();
  //     console.log(p);
  // } catch (error) {
  //     console.log(error);
  // }

  //   citas.push({GetCitas()});
  
  // })
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
      console.log(pacientes);
  } catch (error) {
      console.log(error);
  }
};

function CalculateRanges() {
  let horasPorDia = new Map();
  let rangoMayor = '';
  let rangoMenor = '';
  let frec = '';
  let dia = '';

  agenda.forEach(horario => {
    rangoMayor = horario.horaFinal.substring(0,2);
    rangoMenor = horario.horaInicio.substring(0,2);
    frec = frecuencia.substring(2,4);
    dia = weekdays[horario.num];
    let lista = [];
    if(frec === '00'){
      while(rangoMayor >= rangoMenor){
        lista.push(rangoMayor + ':' + frec);
        rangoMayor -= 1;
      }
      horasPorDia.set(dia, lista);
    }
    else{
      while(rangoMayor >= rangoMenor){
        lista.push(rangoMayor + ':' + '00');
        lista.push(rangoMayor + ':' + frec);
        rangoMayor -= 1;
      }
      horasPorDia.set(dia, lista);
    }
  });
  //console.log(horasPorDia);
  return horasPorDia;
}

function EnableHoursAppointments() {
  const horasCitas = Array.from(document.querySelectorAll('.horaCita'));
  let rango = CalculateRanges();

  horasCitas.forEach(element => {
    if(rango.has(element.getAttribute('data-day'))){
      //console.log(rango.get(element.getAttribute('data-day')));
      if(rango.get(element.getAttribute('data-day')).includes(element.getAttribute('data-time'))){
        console.log(element.getAttribute('data-read'));
     
        element.setAttribute('data-bs-toggle', 'modal');
        element.setAttribute('data-bs-target', "#reg-modal");
        element.classList.add('enableHourAppointment');
        element.classList.remove('grid-item');
        // element.textContent = element.getAttribute('data-infor');
        // element.getAttribute('data-infor').substring(0,5)
        element.textContent = 'Registrar Cita';
      }
    }
  });
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
        appointment1.setAttribute('data-read',semana[0].getFullYear() + '-' + ReturnNumber(semana[0].getMonth()) + '-' + ReturnNumber(semana[0].getDay()));
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
        appointment2.setAttribute('data-read',semana[1].getFullYear() + '-' + ReturnNumber(semana[1].getMonth()) + '-' + ReturnNumber(semana[1].getDay()));
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
        appointment3.setAttribute('data-read',semana[2].getFullYear() + '-' + ReturnNumber(semana[2].getMonth()) + '-' + ReturnNumber(semana[2].getDay()));
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
        appointment4.setAttribute('data-read',semana[3].getFullYear() + '-' + ReturnNumber(semana[3].getMonth()) + '-' + ReturnNumber(semana[3].getDay()));
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
        appointment5.setAttribute('data-read',semana[4].getFullYear() + '-' + ReturnNumber(semana[4].getMonth()) + '-' + ReturnNumber(semana[4].getDay()));
    
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
        appointment1.setAttribute('data-read',semana[0].getFullYear() + '-' + ReturnNumber(semana[0].getMonth()) + '-' + ReturnNumber(semana[0].getDay()));
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
        appointment2.setAttribute('data-read',semana[1].getFullYear() + '-' + ReturnNumber(semana[1].getMonth()) + '-' + ReturnNumber(semana[1].getDay()));
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
        appointment3.setAttribute('data-read',semana[2].getFullYear() + '-' + ReturnNumber(semana[2].getMonth()) + '-' + ReturnNumber(semana[2].getDay()));
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
        appointment4.setAttribute('data-read',semana[3].getFullYear() + '-' + ReturnNumber(semana[3].getMonth()) + '-' + ReturnNumber(semana[3].getDay()));
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
        appointment5.setAttribute('data-read',semana[4].getFullYear() + '-' + ReturnNumber(semana[4].getMonth()) + '-' + ReturnNumber(semana[4].getDay()));

    
        line += hora.outerHTML;
        line += appointment1.outerHTML;
        line += appointment2.outerHTML;
        line += appointment3.outerHTML;
        line += appointment4.outerHTML;
        line += appointment5.outerHTML;
      }
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

  //console.log(event.relatedTarget);

  modalBody.innerHTML = `
  <div class="form-group">
    <form>
      <div>
      <label>Fecha</label>
      <input type="text" class="form-control" id='fecha-cita' value='${event.relatedTarget.getAttribute('data-date')}' readonly>
      <label>Hora</label>
      <input type="text" class="form-control" id='hora-cita' value='${event.relatedTarget.getAttribute('data-time')}' readonly>
      <label>Motivo</label>
      <input type="text" class="form-control" id='motivo-cita' required>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text mt-3" for="inputGroupSelect01">Paciente</label>
        </div>
        <select class="custom-select mt-3" id="inputGroupSelect01" required>
          <option value='' id='seleccionar' selected disabled>Seleccionar...</option>
          ${line}
        </select>
    </form>
  </div>
  `;
  
  // Verificar campo de motivo esta completado antes de enviar
  // Agregarle al div una clase de citas ya guardadas y que cambie de color
}

function ResetData() {
  document.querySelector('#motivo-cita').value = '';
  document.querySelector('#seleccionar').selected = true;
}

function AddEvents() {
  document.querySelectorAll('div .day-active').forEach(element => {
    element.addEventListener('click', LoadWeek);
  });
  $(document).on('show.bs.modal', modalBody, LoadInforModal);
  $('#cancel-button').on('click', ResetData);
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