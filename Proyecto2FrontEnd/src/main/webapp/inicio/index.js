let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const clinicas = ['Clinica A', 'Clininca B', 'Clinica C'];
const calendarios = document.querySelector('.contenedor-calendarios');
const actualDay = document.querySelector('#weekly-monthDisplay');
let actualWeek = 0;
let header = '';
let semana = [];
const frecuencia = '1:00';
const schedule = document.querySelector('.grid-container');
const horas = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
             '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
             '16:00', '16:30', '17:00','17:30', '18:00', '18:30', '19:00', '19:30','20:00'];
const agenda = [{num: 3, dia:'Miercoles', horaInicio: '10:00', horaFinal:'11:00'},
              {num: 4, dia:'Jueves', horaInicio: '10:00', horaFinal:'11:00'},
              {num: 5, dia:'Viernes', horaInicio: '10:00', horaFinal:'11:00'},];

function Load() {
  InitButtons();
  InitCalendar();
  LoadActualWeek();
  AddEvents();
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

function LoadDays() {
  let line = '';
  if( semana.length > 0) {
    if(frecuencia === '1:00'){
      for(let i = 0; i <= 25; i+=2){
        const hora = document.createElement('div');
        hora.textContent = horas[i];
        hora.classList.add('grid-item');
        hora.classList.add('hora');
        const appointment1 = document.createElement('div');
        appointment1.classList.add('grid-item');
        appointment1.classList.add(weekdays[1]);
        appointment1.classList.add(horas[i]);
        appointment1.textContent = horas[i] + '-' + semana[0].toDateString();
        const appointment2 = document.createElement('div');
        appointment2.classList.add('grid-item');
        appointment2.classList.add(weekdays[2]);
        appointment2.classList.add(horas[i]);
        appointment2.textContent = horas[i] + '-' + semana[1].toDateString();
        const appointment3 = document.createElement('div');
        appointment3.classList.add('grid-item');
        appointment3.classList.add(weekdays[3]);
        appointment3.classList.add(horas[i]);
        appointment3.textContent = horas[i] + '-' + semana[2].toDateString();
        const appointment4 = document.createElement('div');
        appointment4.classList.add('grid-item');
        appointment4.classList.add(weekdays[4]);
        appointment4.classList.add(horas[i]);
        appointment4.textContent = horas[i] + '-' + semana[3].toDateString();
        const appointment5 = document.createElement('div');
        appointment5.classList.add('grid-item');
        appointment5.classList.add(weekdays[5]);
        appointment5.classList.add(horas[i]);
        appointment5.textContent = horas[i] + '-' + semana[4].toDateString();
    
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
        appointment1.classList.add(weekdays[1]);
        appointment1.classList.add(horas[i]);
        appointment1.textContent = horas[i] + '-' + semana[0].toDateString();
        const appointment2 = document.createElement('div');
        appointment2.classList.add('grid-item');
        appointment2.classList.add(weekdays[2]);
        appointment2.classList.add(horas[i]);
        appointment2.textContent = horas[i] + '-' + semana[1].toDateString();
        const appointment3 = document.createElement('div');
        appointment3.classList.add('grid-item');
        appointment3.classList.add(weekdays[3]);
        appointment3.classList.add(horas[i]);
        appointment3.textContent = horas[i] + '-' + semana[2].toDateString();
        const appointment4 = document.createElement('div');
        appointment4.classList.add('grid-item');
        appointment4.classList.add(weekdays[4]);
        appointment4.classList.add(horas[i]);
        appointment4.textContent = horas[i] + '-' + semana[3].toDateString();
        const appointment5 = document.createElement('div');
        appointment5.classList.add('grid-item');
        appointment5.classList.add(weekdays[5]);
        appointment5.classList.add(horas[i]);
        appointment5.textContent = horas[i] + '-' + semana[4].toDateString();
    
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
    //console.log(semana);
  } 
  );
}

function AddEvents() {
  document.querySelectorAll('div .day-active').forEach(element => {
    //console.log(element);
    element.addEventListener('click', LoadWeek);
  });
}

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