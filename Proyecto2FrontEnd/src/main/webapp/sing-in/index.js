var metaData = {id:'', pwd:''};
var backend = "http://localhost:8080/Proyecto2Backend/api";
const NET_ERR = 999;
var doctor = {clinica: "", especialidad: "", estado: "Espera", fee: "", fotoPath: "", id: "", localidad: "", nombre: "", password: "", presentacion: "presentacion...", tipo: "Medico"};
const dias = [
    { dia: "Lunes", num: 0 },
    { dia: "Martes", num: 1 },
    { dia: "Miercoles", num: 2 },
    { dia: "Jueves", num: 3 },
    { dia: "Viernes", num: 4 },
];


var especialidades = [];
var ciudades = [];

//BTNS
const singInBtn = document.getElementById("sing-up-btn");
const schedule = document.getElementById("schedule-btn");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalSaveBtn = document.getElementById("modal-save-btn");


//elementos del modal
const modalBody = document.getElementById("modal-body");
//mappedDays para ir cambiando de manerta dinámica los días
var mappedDays = [];

schedule.onclick = () => {
    $("#modal-container").modal("show");

};

modalCloseBtn.onclick = () => {
    $("#modal-container").modal("hide");
};

modalSaveBtn.onclick = () => {
    const selectedDays = Array.from(
      document.querySelectorAll("input[name=mycheckboxes]:checked")
    );
    mappedDays = [];
    selectedDays.forEach(element => {
      mappedDays.push({
        dia: element.parentNode.childNodes[2].childNodes[0].data,
        horaInicio: element.parentNode.childNodes[4].childNodes[3].value,
        horaFinal: element.parentNode.childNodes[4].childNodes[7].value,
        codigo:'',
        idMedico:'',
        frecuencia:''
      });
    });
    $("#modal-container").modal("hide");
  
    console.log(mappedDays);
};


function loadDoctor(){
    let foto = document.getElementsByName("foto")[0].value;
    console.log("IMAGEN : "+document.getElementsByName("foto")[0].value);
    doctor.id = $("#id").val();
    doctor.nombre = $("#name").val();
    doctor.password = $("#password").val();
    doctor.localidad = $("#location").val();
    doctor.clinica = $("#clinica").val();
    doctor.especialidad = $("#speciality").val();
    doctor.fee = $("#fee").val();
    doctor.fotoPath = foto;
}

function resetDoc(){
    doctor.id = "";
    doctor.nombre = "";
    doctor.password = "";
    doctor.localidad = "";
    doctor.clinica = "";
    doctor.especialidad = "";
    doctor.fee = "";
    doctor.fotoPath = "";
}

function addDoctor() {
    let frecuencia = document.getElementById("frecuencia")[0].value;
    console.log("frec: "+frecuencia);
    frecuencia = frecuencia+'';
    if(frecuencia === '60'){
        frecuencia = '01:00';
    }else{
        frecuencia = '00:30';
    }
    (async () => {
      try {
         await addMed(); //funciona
            setTimeout(function () {
                console.log("I am the third log after 5 seconds");
            }, 5000);
         console.log("Se ha agredo el medicoOOOOOOOOO");
            mappedDays.forEach(element => {
                console.log("MAPPED");
                element.codigo = '-1';
                element.idMedico = doctor.id;
                element.frecuencia = frecuencia;
            });
         await addSchedule();
         console.log("Se pudo agregar el horario");
        
       resetDoc();
      } catch (err) {
        console.log(err);
        return;
      }
    })();
}

function addMed() {
    loadDoctor();
    load();
    const request = new Request(backend + '/medicos',
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(doctor)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                        console.log("No se pudo agregar medico ==>addMed()");
                //errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            //$('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
} 

async function addImagen() {
    var imagenData = new FormData();
    imagenData.append("cedula", doctor.cedula);
    imagenData.append("imagen", $("#imagen").get(0).files[0]);
    let request = new Request(backend + '/medicos/' + doctor.cedula + '/imagen', {method: 'POST', body: imagenData});
    const response = await fetch(request);
    if (!response.ok) {
        console.log("error en addImagen()");
//        errorMessage(response.status, $("#add-modal #errorDiv"));
        return;
    }
}

function addSchedule() {
    load();
    const request = new Request(backend + '/horarios/'+doctor.id,
            {method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(mappedDays)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log("No se pudo agregar el horario ==>addSchedule(");
                //errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            //$('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
} 

const loadUserData  = (user) => {
    document.getElementsByName("id")[0].value = user.id;
    document.getElementsByName("password")[0].value = user.password;
    document.getElementsByName("name")[0].value = user.name;
    document.getElementsByName("speciality")[0].value = user.speciality;
    document.getElementsByName("fee")[0].value = user.fee;
    document.getElementsByName("location")[0].value = user.location;
};

const load = () => {
    $("form").submit(function (e) {
      e.preventDefault();
    });
    LoadSchedule();
};

//buscar
const search = async (id) => {
    try {
      const req = new Request(backend + "/medicos/" + id, {method: "GET", headers: {}});
      const res = await fetch(req);
      if (!res.ok) {
        console.log("error al buscar medico");
      }
      var result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
    }
};


const cargarComobox = async () => {
    try {
        const req = new Request(backend + "/especialidades", {
          method: "GET",
          headers: {},
        });
        const res = await fetch(req);
        if (!res.ok) {
          console.log("Error al cargar especialidades");
          return;
        }
        especialidades = await res.json();



        const reqCiudades = new Request(backend+"/ciudades", {method: "GET", headers:{}});
        const resCiudades = await fetch(reqCiudades);
        if (!res.ok) {
            console.log("Error al cargar ciudades");
            return;
        }
        ciudades =  await resCiudades.json();

    } catch (error) {
        console.log(error);
    }
};


const load2 = async () => {
    $("form").submit(function (e) {
      e.preventDefault();
    });

    await cargarComobox();
    
    LoadSchedule();
    loadCities();//carga en el html
    loadSpecialities();//carga en el html
    
};

function loadSpecialities() {
  let elementos = '';
  let speciality = document.getElementById('speciality');
  especialidades.forEach(element =>{
    elementos += `<option value="${element.codigo}">${element.nombre}</option>`
  });
  speciality.innerHTML = elementos;
}

function loadCities() {
  let elementos = '';
  let location = document.getElementById('location');
  ciudades.forEach(element =>{
    elementos += `<option value="${element.codigo}" >${element.nombre}, ${element.provincia}</option>`
  });
  location.innerHTML = elementos;
}

function LoadSchedule() {
    let elementos = "";
    dias.forEach((element) => {
      elementos += `
          <div class="day col">
              <div class="row my-2">
              <input type="checkbox" name="mycheckboxes"><strong class='${element.dia}' >${element.dia}</strong></input>
              <div class="day-infor">
                  <label>Hora inicio</label>
                  <select class="day-hour-item inicio">
                      <option value="0:00" disabled selected>0:00</option>
                      <option value="8:00">8:00</option>
                      <option value="9:00">9:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                  </select>
                  <label>Hora final</label>
                  <select class="day-hour-item final">
                      <option value="0:00" disabled selected>0:00</option>
                      <option value="8:00">8:00</option>
                      <option value="9:00">9:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                  </select>
              </div>
              </div>
          </div>
          `;
    });
    modalBody.innerHTML = elementos;
  }

  errorMessage = (status, place) => {
    switch (status) {
      case 404:
        error = "Registro no encontrado";
        break;
      case 666:
        error = "Usuario o contraseña incorrecta";
        break;
      case 403:
      case 409:
        error = "Usuario no autorizado";
        break;
      case 406:
      case 405:
        error = "Usuario ya existe";
        break;
      case NET_ERR:
        error = "Error de comunicación";
        break;
    }
//    place[0].innerHTML =
//      '<div class="alert alert-danger fade show">' +
//      '<h4 class="alert-heading">Error!</h4>' +
//      error +
//      "</div>";
//    return;
  };
  
  document.addEventListener("DOMContentLoaded", load2);
  