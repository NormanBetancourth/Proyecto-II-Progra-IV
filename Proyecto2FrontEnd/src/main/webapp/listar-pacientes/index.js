const table = document.getElementById("table-container");
const tableBody = document.getElementById("table-body");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");
var backend = "http://localhost:8080/Proyecto2Backend/api";

var date;

var pacientes = [];
var medico;
var objEvent = { id: "", type: "" };

modalCloseBtn.onclick = () => {
  $("#modal-container").modal("hide");
};

table.onclick = async (e) => {
  if (e.target.dataset.event != undefined) {
    objEvent.id = e.target.dataset.id;
    objEvent.type = e.target.dataset.event;

    if (e.target.dataset.event === "info") {
      await loadInfoView(objEvent.id);
      $("#modal-container").modal("show");
    }
    if (e.target.dataset.event === "antecedentes") {
      await loadAntecedentesView(objEvent.id);
      $("#modal-container").modal("show");
    }
    if (e.target.dataset.event === "examenes") {
      await loadExamenesView(objEvent.id); //TODO: hacer examenes
      $("#modal-container").modal("show");
    }
    if (e.target.dataset.event === "citas") {
      await loadCitasView(objEvent.id);
      $("#modal-container").modal("show");
    }
    if (e.target.dataset.event === "agendar") {
      await loadAgendarView(objEvent.id);
      $("#modal-container").modal("show");
    }
  }
};


const loadCitasView = async (id) => {

    var contEmgPorPaciente = await contactosGET(id);
    loadContactModal(contEmgPorPaciente);



};


const loadContactModal = async (contactos) => {
    let infoAgenda = `    
    <form onsubmit="contactosPOST()">
    <div class="row">
      <div class="col" ></div>
      <div class="col-10" >
        <div class="row">
          <div class="row aling-items-center text-center mt-2">
            <h6>Agregar Nuevo Contacto</h6>
          </div>
          <div class="row aling-items-center text-center my-2" >
            <div class="col"></div>
            <div class="col" >
              <div class="form-group my-4">
                <input type="text" class="form-control" id="contacto-id" placeholder="Id" required>
              </div>
              <div class="form-group my-4">
                <input type="text" class="form-control" id="contacto-nombre" placeholder="Nombre" required>
              </div>
              <div class="form-group my-4">
                <input type="text" class="form-control" id="contacto-telefono" placeholder="Telefono" required>
              </div>
              <div class="form-group my-4">
                <button type="submit" class="btn btn-success">Agregar</button>
              </div>
            </div>
            <div class="col"></div>
          </div>
        </div>
        <div class="row"  style="background-color: white;">
          
          <table class="table table-hover text-center align-items-center" id="table-container">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Tel??fono</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>

            <tbody id="table-body-contacts">
            </tbody>
          </table>
        </div>
      </div>
      <div class="col" ></div>
    </div>
  </form>`;
    modalBody.innerHTML = infoAgenda;

    const tableBodyContacts = document.getElementById('table-body-contacts');
    var contentExtra = ``;

    contactos.forEach(element => {
        console.log(element);
        contentExtra += `
            <tr>
                <td>${element.id}</td>
                <td>${element.nombre}</td>
                <td>
                    <input type="text" class="form-control" value='${element.telefono}' id='update-telefono-${element.id}' required>
                </td>
                
                <td  >
                    <button type="button" class="btn btn-primary" id = 'btn-edit-${element.id}' data-id-contact='${element.id}' data-id-paciente='${element.idPaciente}' data-nombre='${element.nombre}'  data-numero='${element.numero}'>???</button>
                </td>
                <td  >
                    <button type="button" class="btn btn-danger"  id = 'btn-delete-${element.id}' data-id-contact='${element.id}' data-id-paciente='${element.idPaciente}' data-nombre='${element.nombre}'  data-numero='${element.numero}'>???</button>
                </td>
            </tr>
        `;
    });


    tableBodyContacts.innerHTML = contentExtra;

    contactos.forEach( element => {
      const btnEdit = document.getElementById(`btn-edit-${element.id}`);
      btnEdit.onclick = async (e) => {
        const telefonoUpdate = document.getElementById(`update-telefono-${element.id}`);
        if(telefonoUpdate.value == ''){
          alert("Debes mandar un numero para modificar");
          return;
        }

        contactoPUT = {
          numero:e.target.dataset.numero,
          id:e.target.dataset.idContact,
          idPaciente: e.target.dataset.idPaciente,
          nombre: e.target.dataset.nombre,
          telefono:  telefonoUpdate.value
        }
        console.log(contactoPUT);

        await contactosPUT(contactoPUT);

        $("#modal-container").modal("hide");

      };
  
      const btnDelete = document.getElementById(`btn-delete-${element.id}`);
      btnDelete.onclick = async (e) => {
        await contactosDELETE(e.target.dataset.numero);
        $("#modal-container").modal("hide");
      };
      
    });


    const element = document.querySelector("form");
    element.addEventListener("submit", (event) => {
      event.preventDefault();
    });


  


    
};

const loadAgendarView = async (id) => {
  let infoAgenda = `    <form onsubmit="addCita()">
                            <div class="row justify-content-center text-center">
                            <div class="col"></div>
                            <div class="col-6">
                                <div class="row my-2">
                                <h4>Agregar una cita</h4>
                                </div>
                                <div class="row justify-content-center text-center">
                                <div class="row justify-content-center text-center">
                                    <div class="row justify-content-center text-center">
                                    <div class="col"></div>
                                    <div class="col my-3 justify-content-center text-center">
                                        <h6>Seleccione el d??a</h6>
                                        <input type="date" required id="date-picker" />
                                        <button
                                        type="button"
                                        class="btn btn-light my-2"
                                        id="btn-apply"
                                        >
                                        Aplicar d??a
                                        </button>
                                    </div>
                                    <div class="col"></div>
                                    </div>
                                    <div class="row">
                                    <div class="col"></div>
                                    <div class="col">
                                        <h6>Seleccione la hora</h6>
                                        <select id="cita-hora" required>


                                        </select>
                                    </div>
                                    <div class="col"></div>
                                    </div>
                                    <div class="row mt-4">
                                    <h5>Detalle el motivo de la cita</h5>
                                    <textarea
                                        id="cita-motivo"
                                        cols="60"
                                        rows="10"
                                        required
                                        style="resize: none"
                                    ></textarea>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col"></div>
                            </div>
                            <div class="row align-items-center text-center">
                            <div class="col"></div>
                            <div class="col my-5">
                                <button type="submit" class="btn btn-primary">Agregar cita</button>
                            </div>
                            <div class="col"></div>
                            </div>
                        </form>`;
  modalBody.innerHTML = infoAgenda;
  const element = document.querySelector("form");
  element.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  date = document.getElementById("date-picker");
  date.min = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  const btn = document.getElementById("btn-apply");
  btn.onclick = () => {
    horarioBuild(date.value);
  };
};

const buildLitDay = (dateFormat) => {
  let date = new Date(dateFormat);
  let day = date.getDay();
  let literalDay;

  if (day === 0) {
    literalDay = "Lunes";
  }
  if (day === 1) {
    literalDay = "Martes";
  }
  if (day === 2) {
    literalDay = "Miercoles";
  }
  if (day === 3) {
    literalDay = "Jueves";
  }
  if (day === 4) {
    literalDay = "Viernes";
  }
  if (day === 5) {
    literalDay = "Sabado";
  }
  if (day === 6) {
    literalDay = "Domingo";
  }
  return literalDay;
};

const validarDiaQueAtiendeMedico = (dia, horario) => {
  horario.forEach(element => {
    if(dia === element.dia){
      return true;
    }
  });
  return false;
};

const horarioBuild = async (dateFormat) => {
  let day = buildLitDay(dateFormat);
  let horario = await horarioGET();
  var citasPorDia = await CitasPorFechaGET(dateFormat);
  if (horario[0].frecuencia == "00:30") {
    //Manejar con frecuencia 30 mins
    var mappedours = ['08:00', '08:30', '09:00', '09:30', '10:00','10:30', '11:00',
                      '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
                      '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
                      '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
    const select = document.getElementById("cita-hora");
    var content = ` 
                        <option value="00:00" id="00:00"  selected disabled >Seleccione una Hora</option>
                        <option value="08:00" id="08:00" style="display: none;" >08:00</option>
                        <option value="08:30" id="08:30" style="display: none;" >08:30</option>
                        <option value="09:00" id="09:00" style="display: none;" >09:00</option>
                        <option value="09:30" id="09:30" style="display: none;" >09:30</option>
                        <option value="10:00" id="10:00" style="display: none;" >10:00</option>
                        <option value="10:30" id="10:30" style="display: none;" >10:30</option>
                        <option value="11:00" id="11:00" style="display: none;" >11:00</option>
                        <option value="11:30" id="11:30" style="display: none;" >11:30</option>
                        <option value="12:00" id="12:00" style="display: none;" >12:00</option>
                        <option value="12:30" id="12:30" style="display: none;" >12:30</option>
                        <option value="13:00" id="13:00" style="display: none;" >13:00</option>
                        <option value="13:30" id="13:30" style="display: none;" >13:30</option>
                        <option value="14:00" id="14:00" style="display: none;" >14:00</option>
                        <option value="14:30" id="14:30" style="display: none;" >14:30</option>
                        <option value="15:00" id="15:00" style="display: none;" >15:00</option>
                        <option value="15:30" id="15:30" style="display: none;" >15:30</option>
                        <option value="16:00" id="16:00" style="display: none;" >16:00</option>
                        <option value="16:30" id="16:30" style="display: none;" >16:30</option>
                        <option value="17:00" id="17:00" style="display: none;" >17:00</option>
                        <option value="17:30" id="17:30" style="display: none;" >17:30</option>
                        <option value="18:00" id="18:00" style="display: none;" >18:00</option>
                        <option value="18:30" id="18:30" style="display: none;" >18:30</option>
                        <option value="19:00" id="19:00" style="display: none;" >19:00</option>
                        <option value="19:30" id="19:30" style="display: none;" >19:30</option>
                        <option value="20:00" id="20:00" style="display: none;" >20:00</option>`;
    select.innerHTML = content;

    
    var bandera = validarDiaQueAtiendeMedico(day, horario);
    if(bandera != null){
      citasPorDia.forEach((element) => {
        const test = document.getElementById(element.fecha.substring(11, 16));
        test.setAttribute("disabled", "disabled");
      });

      var optionSelected;
      var banderaInterna = false;
      var diaAux;
      horario.forEach(element =>{
        if(day == element.dia){
          diaAux = element;
        }
      });
      var horaInicioMedico = diaAux.horaInicio;
      var horaFinalMedico = diaAux.horaFinal;
      
      mappedours.forEach(element => {
        optionSelected = document.getElementById(element);
        if(horaInicioMedico.substring(0,5) == optionSelected.id){
          banderaInterna = true;
        }

        if(horaFinalMedico.substring(0,5) == optionSelected.id){
          optionSelected.style.display = "block";
          banderaInterna = false;
        }

        if(banderaInterna == true){
          optionSelected.style.display = "block";
        }
      });

    }
    
  } else {
    //Manejar con frecuencia 1 hora
    const select = document.getElementById("cita-hora");
    var content = ` 
                        <option value="00:00" id="00:00" selected disabled >Seleccione una Hora</option>
                        <option value="08:00" id = "08:00" style="display: none;">08:00</option>
                        <option value="09:00" id = "09:00" style="display: none;">09:00</option>
                        <option value="10:00" id = "10:00" style="display: none;">10:00</option>
                        <option value="11:00" id = "11:00" style="display: none;">11:00</option>
                        <option value="12:00" id = "12:00" style="display: none;">12:00</option>
                        <option value="13:00" id = "13:00" style="display: none;">13:00</option>
                        <option value="14:00" id = "14:00" style="display: none;">14:00</option>
                        <option value="15:00" id = "15:00" style="display: none;">15:00</option>
                        <option value="16:00" id = "16:00" style="display: none;">16:00</option>
                        <option value="17:00" id = "17:00" style="display: none;">17:00</option>
                        <option value="18:00" id = "18:00" style="display: none;">18:00</option>
                        <option value="19:00" id = "19:00" style="display: none;">19:00</option>
                        <option value="20:00" id = "20:00" style="display: none;">20:00</option>`;

    select.innerHTML = content;

    
    
    var bandera = validarDiaQueAtiendeMedico(day, horario);
    if(bandera != null){
      citasPorDia.forEach((element) => {
        const test = document.getElementById(element.fecha.substring(11, 16));
        test.setAttribute("disabled", "disabled");
      });

      var optionSelected;
      var banderaInterna = false;
      var diaAux;
      horario.forEach(element =>{
        if(day == element.dia){
          diaAux = element;
        }
      });
      var horaInicioMedico = diaAux.horaInicio;
      var horaFinalMedico = diaAux.horaFinal;
      console.log(horaInicioMedico.substring(0,5));
      console.log(horaFinalMedico.substring(0,5));


      for(var i = 8; i <= 20; i++) {
        if(i<10){
          optionSelected = document.getElementById(`0${i}:00`)
          
        }else{
          optionSelected = document.getElementById(`${i}:00`)
        }

        
        if(horaInicioMedico.substring(0,5) == optionSelected.id){
          banderaInterna = true;
        }

        if(horaFinalMedico.substring(0,5) == optionSelected.id){
          optionSelected.style.display = "block";
          banderaInterna = false;
        }

        if(banderaInterna == true){
          optionSelected.style.display = "block";
        }
      }

    }


  }
};

const addCita = async () => {
  const fecha = document.getElementById("date-picker");
  const hora = document.getElementById("cita-hora");
  const motivo = document.getElementById("cita-motivo");

  if (hora.value == "00:00") {
    alert("Debes seleccionar una hora para la consulta");
    return;
  }
  $("#modal-container").modal("hide");
  var pacientePost = await cargarPacientePorId(objEvent.id);
  var currentMedic = await obtenerMedicoSession();
  cita = {
    paciente: pacientePost,
    medico: currentMedic,
    fecha: `${fecha.value}T${hora.value}:00`,
    motivo: motivo.value,
    signos: "",
    diagnostico: "",
    estado: "Registrado",
    prescripciones: "",
    Medicamentos: "",
  };
  console.log(cita);

  await citasPOST(cita);
};

const loadAntecedentesView = async (id) => {
  let antecedentesDePaciente = await antecedentesGET(id);
  let infoAntecedentes = `    <div class="row">
                                <div class="col"></div>
                                <div class="col-10" >
                                    <div class="row align-items-center text-center mt-2">
                                        <h4>Antecedentes</h4>
                                    </div>
                                    <form onsubmit="addAntecedente()">
                                    <div class="row">
                                            <div class="col"></div>
                                            <div class="col   text-center">
                                                <div class="form-group py-3">
                                                    <label for="exampleInputEmail1">Tipo de antecedente</label>
                                                    <select class="form-select" aria-label="Default select example" id="antecedente-tipo" required>
                                                    <option value="Enfermedad">Enfermedad</option>
                                                    <option value="Alergia">Alergia</option>
                                                    <option value="Cirugia">Cirugia</option>
                                                    <option value="Padecimiento">Padecimiento</option>
                                                    <option value="Otro" selected>Otro</option>
                                                    </select>
                                                </div>
                                                <div class="form-group my-1 ">
                                                    <label for="exampleInputPassword1">Detalles</label>
                                                    <div class="row align-items-center text-center my-3">
                                                        <textarea type="text"  id="antecedente-detalles" style="min-height: 100px; resize: none;"   id="id-usr"  required></textarea>
                                                        <div class="col mt-4">
                                                            <button type="submit" class="btn btn-primary">Agregar antecedente</button>
                                                        </div>
                                                    </div>
                                
                                                </div>
                                            </div>
                                            <div class="col"></div>
                                    </div>
                                    </form>    
                                    
                                    <div class="row align-items-center text-center">
                                        <table class="table table-hover">
                                            <thead>
                                            <tr>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Antecedente</th>
                                            </tr>
                                            </thead>
                                            <tbody id="table-body-antecedente">
                                            

                                            
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col"></div>
                            </div>`;
  modalBody.innerHTML = infoAntecedentes;

  let dataAntecedentes = ``;
  antecedentesDePaciente.forEach((element) => {
    dataAntecedentes += `<tr>
                                <th scope="row">${element.tipo}</th>
                                <td>${element.anotacion}</td>
                              </tr>`;
  });
  const tableAntecedentesBody = document.getElementById(
    "table-body-antecedente"
  );
  tableAntecedentesBody.innerHTML = dataAntecedentes;

  const element = document.querySelector("form");
  element.addEventListener("submit", (event) => {
    event.preventDefault();
  });
};

const loadInfoView = async (id) => {
  //TODO: Hacer que edite la pic
  let pacienteInfo = await cargarPacientePorId(id);
  let infoView = `<div class="row">
                    <div class="col"></div>
                    <div class="col-8">
                        <form onsubmit="updatePatient()">
                            <h3>Ficha Basica del Paciente</h3>
                            <div class="form-group">

                                <label for="formGroupExampleInput">Nombre</label>
                                <input type="text" class="form-control" id='paciente-nombre' value='${pacienteInfo.nombre}' placeholder="Nombre">
                                </div>
                                <div class="form-group">
                                
                                <label for="formGroupExampleInput">ID</label>
                                <input type="text" class="form-control" id='paciente-id' value='${pacienteInfo.id}' placeholder="Nombre" readonly>
                                </div>
                                
                                
                                <div class="form-group">
                                <label for="formGroupExampleInput2">Foto</label>
                                <input id='paciente-foto' type="file" class="form-control" accept="image/*" input>
                                
                                </div>
                                <div class="form-group">
                                <label for="formGroupExampleInput2">Tel??fono</label>
                                <input id='paciente-telefono' type="text" class="form-control" placeholder="Tel??fono" value="${pacienteInfo.telefono}">
                            </div>
                            <div class="form-group align-items-center text-center">
                                <button type="submit" class="btn btn-lg btn-success" id="actualizar-ficha">Aceptar</button>
                            </div>
                        </form>
                    </div>
                    <div class="col"></div>
                </div>`;

  modalBody.innerHTML = infoView;

  const element = document.querySelector("form");
  element.addEventListener("submit", (event) => {
    event.preventDefault();
  });
};

const loadUsersOnView = async () => {
  var content = "";
  pacientes.forEach((user) => {
    content += `<tr data-id="${user.id}" data-event="info">
        <th data-id="${user.id}" data-event="info" scope="row">${user.id}</th>
        <td data-id="${user.id}" data-event="info">${user.nombre}</td>
        <td data-id="${user.id}" data-event="info">
        <button data-id="${user.id}" data-event="antecedentes"  class="btn btn-info"><img src="./../img/antecedentes.png" data-id="${user.id}" data-event="antecedentes"></button>
                    </td>

                    <td data-id="${user.id}" data-event="info">
                        <button data-id="${user.id}" data-event="examenes"  class="btn btn-info"><img src="./../img/examenes.png" data-id="${user.id}" data-event="examenes"></button>
                    </td>

                    <td data-id="${user.id}" data-event="info">
                        <button data-id="${user.id}" data-event="citas"  class="btn btn-info"><img src="./../img/apoinment.png" data-id="${user.id}" data-event="citas"></button>
                    </td>

                    <td data-id="${user.id}" data-event="info">
                        <button data-id="${user.id}" data-event="agendar"  class="btn btn-info"><img src="./../img/new.png" data-id="${user.id}" data-event="agendar"></button>
                        </td>
                        </tr>`;
  });

  tableBody.innerHTML = content;
};

const addAntecedente = async () => {
  const tipoAntecedente = document.getElementById("antecedente-tipo");
  const detallesAntecedente = document.getElementById("antecedente-detalles");

  let foo = {
    anotacion: detallesAntecedente.value,
    codigo: "-1",
    idPaciente: objEvent.id,
    tipo: tipoAntecedente.value,
  };
  antecedentesPOST(foo);
  $("#modal-container").modal("hide");
};

//REST API METHODS

const contactosGET = async (id) =>{
    try {
        const req = new Request(backend + "/contactos/"+id, {
          method: "GET",
          headers: {},
        });
    
        const res = await fetch(req);
        if (!res.ok) {
          console.log("error al cargar contactos");
          return;
        }
        var result = await res.json();
        return result;
      } catch (error) {
        console.log(error);
      }

};

const horarioGET = async () => {
  try {
    const req = new Request(backend + "/horarios", {
      method: "GET",
      headers: {},
    });

    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al guardad user de session");
      return;
    }
    var result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const citasPOST = async (cita) => {
  const req = new Request(backend + "/citas/fix", {
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
  } catch (error) {
    console.log(error);
  }
};


const contactosPUT = async (contacto) => {
  const req = new Request(backend + "/contactos", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error agregar un contacto");
      return;
    }
    console.log("Se inserta el contact");
  } catch (error) {
    console.log(error);
  }
};

const contactosPOST = async () => {

  const numero = '-1';
  const id = document.getElementById('contacto-id').value;
  const idPaciente = objEvent.id;
  const nombre = document.getElementById('contacto-nombre').value;
  const telefono = document.getElementById('contacto-telefono').value;
  contacto = {numero, id, idPaciente, nombre, telefono};
  const req = new Request(backend + "/contactos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contacto),
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error agregar un contacto");
      return;
    }
    console.log("Se inserta el contact");
  } catch (error) {
    console.log(error);
  }

  $("#modal-container").modal("hide");
};

const contactosDELETE = async (id) => {
  const req = new Request(backend + "/contactos/"+id, {
    method: "DELETE",
    headers: {}
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error eliminar un contacto");
      return;
    }
    console.log("se elimina el contacto");
  } catch (error) {
    console.log(error);
  }

};

const cargarPacientePorId = async (id) => {
  try {
    const req = new Request(backend + "/pacientes/data/" + id, {
      method: "GET",
      headers: {},
    });

    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al guardad user de session");
      return;
    }
    var result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const pacientePUT = async (patient) => {
  const req = new Request(backend + "/pacientes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al hacer put");
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePatient = async () => {
  const patientName = document.getElementById("paciente-nombre").value;
  const patientId = document.getElementById("paciente-id").value;
  const patientFoto = document.getElementById("paciente-foto").value;
  const patientTelefono = document.getElementById("paciente-telefono").value;

  let ban = false;
  let patient = await cargarPacientePorId(patientId);

  if (patient.nombre != patientName) {
    patient.nombre = patientName;
    ban = true;
  }

  if (patient.fotoPath != patientFoto) {
    patient.fotoPath = patientFoto;
    ban = true;
  }

  if (patient.telefono != patientTelefono) {
    patient.telefono = patientTelefono;
    ban = true;
  }

  if (ban == true) {
    await pacientePUT(patient);
    await load();
  }

  $("#modal-container").modal("hide");
};

const antecedentesGET = async (id) => {
  try {
    const req = new Request(backend + "/antecedentes/" + id, {
      method: "GET",
      headers: {},
    });
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al Cargar antecedentes");
      return;
    }
    var result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const antecedentesPOST = async (antecedente) => {
  const req = new Request(backend + "/antecedentes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(antecedente),
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al inserta");
      return;
    }
    console.log("Se inserta");
  } catch (error) {
    console.log(error);
  }
};

const cargarPacientesDeMedico = async (id) => {
  try {
    const req = new Request(backend + "/pacientes/" + id, {
      method: "GET",
      headers: {},
    });

    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al guardad user de session");
      return;
    }
    var result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const obtenerMedicoSession = async () => {
  try {
    const req = new Request(backend + "/session/current", {
      method: "GET",
      headers: {},
    });

    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al guardad user de session");
      return;
    }
    var result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const CitasPorFechaGET = async (fecha) => {
  const req = new Request(backend + "/citas/" + fecha, {
    method: "GET",
    headers: {},
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error en traer horarios por fecha");
      return;
    }
    var result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//LOAD
const load = async () => {
  medico = await obtenerMedicoSession();
  pacientes = await cargarPacientesDeMedico(medico.id);
  loadUsersOnView();
};

document.addEventListener("DOMContentLoaded", load);
