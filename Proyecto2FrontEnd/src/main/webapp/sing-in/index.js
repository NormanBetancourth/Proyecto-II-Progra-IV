var metaData = {id:'', pwd:''};
var backend = "http://localhost:8080/Proyecto2Backend/api";
const NET_ERR = 999;

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
    selectedDays.forEach((element) => {
      mappedDays.push({
        dia: element.parentNode.childNodes[2].childNodes[0].data,
        entrada: element.parentNode.childNodes[4].childNodes[3].value,
        salida: element.parentNode.childNodes[4].childNodes[7].value,
      });
    });
    $("#modal-container").modal("hide");
  
    console.log(mappedDays);
};


function addDoctor() {
    let id = document.getElementsByName("id")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let name = document.getElementsByName("name")[0].value;
    let speciality = document.getElementById("speciality")[0].value;
    let fee = document.getElementsByName("fee")[0].value;
    let location = document.getElementById("location")[0].value; 
    let foto = document.getElementsByName("foto")[0].value;
    console.log("location "+location);
    console.log("speciality "+speciality);
  
    var doctor = { id, password, nombre:name, especialidad:speciality, fee, localidad:location, fotoPath:foto, presentacion:'', tipo:'Medico' };
    //TODO: crear el horario y mandarlo al server
    console.log(doctor);
    console.log(mappedDays);
    
    (async () => {
      try {
        const result = await search(id);
        console.log(doctor);
        console.log(result);
        if (result === undefined){
            //TODO: mandar horario y medicos
            // window.location.href = "./../inicio/index.html";
            return;
        }
        errorMessage(405, $("#errorDiv"));
      } catch (err) {
        console.log(err);
        return;
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
}

const load = () => {
    $("form").submit(function (e) {
      e.preventDefault();
    });
    LoadSchedule();
};

//buscar
const search = async (id) => {
    try {
      const req = new Request(backend + "/medicos/" + id, {
        method: "GET",
        headers: {},
      });
      const res = await fetch(req);
      if (!res.ok) {
        throw BreakException;
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
}


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
    place[0].innerHTML =
      '<div class="alert alert-danger fade show">' +
      '<h4 class="alert-heading">Error!</h4>' +
      error +
      "</div>";
    return;
  };
  
  document.addEventListener("DOMContentLoaded", load2);
  