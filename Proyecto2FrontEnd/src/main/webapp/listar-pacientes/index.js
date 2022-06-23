const table = document.getElementById('table-container');
const tableBody = document.getElementById('table-body');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
var backend = "http://localhost:8080/Proyecto2Backend/api";


var date ;

var pacientes = [];
var medico;
var objEvent = {id:'', type:''};

modalCloseBtn.onclick = () => {
    $("#modal-container").modal("hide");
};

table.onclick = async (e) => {
    if(e.target.dataset.event != undefined){
        objEvent.id = e.target.dataset.id;
        objEvent.type = e.target.dataset.event;

        if(e.target.dataset.event === 'info'){
            await loadInfoView(objEvent.id);
            $("#modal-container").modal("show");
        }
        if(e.target.dataset.event === 'antecedentes'){
            await loadAntecedentesView(objEvent.id);
            $("#modal-container").modal("show");
        }
        if(e.target.dataset.event === 'examenes'){
        
            await loadExamenesView(objEvent.id);//TODO: hacer examenes
            $("#modal-container").modal("show");
        }
        if(e.target.dataset.event === 'citas'){

            await loadCitasView(objEvent.id);//TODO: hacer listado de citas
            $("#modal-container").modal("show");
        }
        if(e.target.dataset.event === 'agendar'){

            await loadAgendarView(objEvent.id);
            $("#modal-container").modal("show");
        }
    }
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
                                        <h6>Seleccione el día</h6>
                                        <input type="date" required id="date-picker" />
                                        <button
                                        type="button"
                                        class="btn btn-light my-2"
                                        id="btn-apply"
                                        >
                                        Aplicar día
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
    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
        event.preventDefault();
    });

    date  = document.getElementById('date-picker');
    date.min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    const btn  = document.getElementById('btn-apply');
    btn.onclick = () => {
        horarioBuild(date.value);  
    }
    
};

const buildLitDay = (dateFormat) =>{
    let date = new Date(dateFormat);
    let day = date.getDay();
    let literalDay;

    if(day === 0) {
        literalDay = 'Lunes';
    }
    if(day === 1) {
        literalDay = 'Martes';
    }
    if(day === 2) {
        literalDay = 'Miercoles';
    }
    if(day === 3) {
        literalDay = 'Jueves';
    }
    if(day === 4) {
        literalDay = 'Viernes';
    }
    if(day === 5) {
        literalDay = 'Sabado';
    }
    if(day === 6) {
        literalDay = 'Domingo';
    }
    return literalDay;
}

const horarioBuild = async (dateFormat) => {
    let day = buildLitDay(dateFormat);
    let horario = await horarioGET();
    var citasPorDia = await CitasPorFechaGET(dateFormat);
    console.log(day);
    console.log(horario);
    console.log(citasPorDia);
    if(horario[0].frecuencia == "00:30"){
        //Manejar con frecuencia 30 mins
        const select =  document.getElementById('cita-hora');
        var content = ` 
                        <option value="00:00" id="00:00" selected disabled >Seleccione una Hora</option>
                        <option value="08:00" id="08:00">08:00</option>
                        <option value="08:30" id="08:30">08:30</option>
                        <option value="09:00" id="09:00">09:00</option>
                        <option value="09:30" id="09:30">09:30</option>
                        <option value="10:00" id="10:00">10:00</option>
                        <option value="10:30" id="10:30">10:30</option>
                        <option value="11:00" id="11:00">11:00</option>
                        <option value="11:30" id="11:30">11:30</option>
                        <option value="12:00" id="12:00">12:00</option>
                        <option value="12:30" id="12:30">12:30</option>
                        <option value="13:00" id="13:00">13:00</option>
                        <option value="13:30" id="13:30">13:30</option>
                        <option value="14:00" id="14:00">14:00</option>
                        <option value="14:30" id="14:30">14:30</option>
                        <option value="15:00" id="15:00">15:00</option>
                        <option value="15:30" id="15:30">15:30</option>
                        <option value="16:00" id="16:00">16:00</option>
                        <option value="16:30" id="16:30">16:30</option>
                        <option value="17:00" id="17:00">17:00</option>
                        <option value="17:30" id="17:30">17:30</option>
                        <option value="18:00" id="18:00">18:00</option>
                        <option value="18:30" id="18:30">18:30</option>
                        <option value="19:00" id="19:00">19:00</option>
                        <option value="19:30" id="19:30">19:30</option>
                        <option value="20:00" id="020:00"">20:00</option>`
        select.innerHTML = content;
        

        citasPorDia.forEach(element => {
            const test = document.getElementById(element.fecha.substring(11, 16));
            test.setAttribute("disabled", "disabled");
        });
    }else{
        //Manejar con frecuencia 1 hora
        const select =  document.getElementById('cita-hora')
        var content = ` 
                        <option value="00:00" id="00:00" selected disabled >Seleccione una Hora</option>
                        <option value="08:00" id = "08:00" >08:00</option>
                        <option value="09:00" id = "09:00" >09:00</option>
                        <option value="10:00" id = "10:00" >10:00</option>
                        <option value="11:00" id = "11:00" >11:00</option>
                        <option value="12:00" id = "12:00" >12:00</option>
                        <option value="13:00" id = "13:00" >13:00</option>
                        <option value="14:00" id = "14:00" >14:00</option>
                        <option value="15:00" id = "15:00" >15:00</option>
                        <option value="16:00" id = "16:00" >16:00</option>
                        <option value="17:00" id = "17:00" >17:00</option>
                        <option value="18:00" id = "18:00" >18:00</option>
                        <option value="19:00" id = "19:00" >19:00</option>
                        <option value="20:00" id = "20:00" >20:00</option>`

        select.innerHTML = content;

        citasPorDia.forEach(element => {
            const test = document.getElementById(element.fecha.substring(11, 16));
            test.setAttribute("disabled", "disabled");
        });

    }
};





const addCita = async () => {
    const fecha = document.getElementById('date-picker');
    const hora = document.getElementById('cita-hora');
    const motivo = document.getElementById('cita-motivo');

    if(hora.value == '00:00'){
        alert("Debes seleccionar una hora para la consulta");
        return;
    }
    $("#modal-container").modal("hide");
    var pacientePost = await cargarPacientePorId(objEvent.id);
    var currentMedic = await obtenerMedicoSession();
    cita = {
        paciente: pacientePost ,
        medico: currentMedic,
        fecha: `${fecha.value}T${hora.value}:00`,
        motivo: motivo.value,
        signos: '',
        diagnostico: '',
        estado: 'Registrado',
        prescripciones: '',
        Medicamentos: ''
    }
    console.log(cita);

    await citasPOST(cita);
};

const loadAntecedentesView = async (id) =>{
    
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

    let dataAntecedentes=``;
    antecedentesDePaciente.forEach(element => {
        dataAntecedentes += `<tr>
                                <th scope="row">${element.tipo}</th>
                                <td>${element.anotacion}</td>
                              </tr>`;
                              
    });
    const tableAntecedentesBody = document.getElementById('table-body-antecedente');
    tableAntecedentesBody.innerHTML = dataAntecedentes;

    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
        event.preventDefault();
    });


    
};

const loadInfoView = async (id) =>{
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
                                <label for="formGroupExampleInput2">Teléfono</label>
                                <input id='paciente-telefono' type="text" class="form-control" placeholder="Teléfono" value="${pacienteInfo.telefono}">
                            </div>
                            <div class="form-group align-items-center text-center">
                                <button type="submit" class="btn btn-lg btn-success" id="actualizar-ficha">Aceptar</button>
                            </div>
                        </form>
                    </div>
                    <div class="col"></div>
                </div>`;

    modalBody.innerHTML = infoView;

    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
        event.preventDefault();
    });

};




const loadUsersOnView = async () => {
    var content = '';
    pacientes.forEach(user => {
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
                        </tr>`
    });

     tableBody.innerHTML = content;
};

const addAntecedente = async () => {

    const tipoAntecedente = document.getElementById('antecedente-tipo');
    const detallesAntecedente = document.getElementById('antecedente-detalles');

    let foo = {anotacion:detallesAntecedente.value, codigo:'-1', idPaciente:objEvent.id, tipo:tipoAntecedente.value}
    antecedentesPOST(foo);
    $("#modal-container").modal("hide");
};

//REST API METHODS


const horarioGET = async () => {
    try {
        const req = new Request(backend+ '/horarios', {
            method: 'GET',
            headers: {}
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
    const req = new Request(backend+'/citas',
    {method: 'POST',
     headers: { 'Content-Type': 'application/json'},
     body: JSON.stringify(cita)});
    try {
        const res = await fetch(req);
        if (!res.ok){
            console.log('error agregar una cita');
            return;
        }
        console.log('Se inserta la cita');
    } catch (error) {
        console.log(error);
    }

};

const cargarPacientePorId =async (id) => {
    try {
        const req = new Request(backend+ '/pacientes/data/'+id, {
            method: 'GET',
            headers: {}
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
    const req = new Request(backend+'/pacientes',
        {method: 'PUT',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify(patient)});
    try {
        const res = await fetch(req);
        if (!res.ok){
            console.log('error al hacer put');
        }
    } catch (error) {
        console.log(error);
    }

};

const updatePatient = async () => {
    const patientName = document.getElementById('paciente-nombre').value;
    const patientId = document.getElementById('paciente-id').value;
    const patientFoto = document.getElementById('paciente-foto').value;
    const patientTelefono = document.getElementById('paciente-telefono').value;

    let ban = false;
    let patient = await cargarPacientePorId(patientId);

    if(patient.nombre != patientName ){
        patient.nombre = patientName;
        ban = true;
    }

    if(patient.fotoPath != patientFoto ){
        patient.fotoPath = patientFoto;
        ban = true;
    }
    
    if(patient.telefono != patientTelefono){
        patient.telefono = patientTelefono;
        ban = true;
    }

    if(ban == true){
        await pacientePUT(patient);
        await load();
    }

    $("#modal-container").modal("hide");

    
};

const antecedentesGET = async (id) =>{

    try {
        const req = new Request(backend+'/antecedentes/'+id,{
            method: 'GET',
            headers: {}
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

const antecedentesPOST = async (antecedente) =>{
    const req = new Request(backend+'/antecedentes',
        {method: 'POST',
         headers: { 'Content-Type': 'application/json'},
         body: JSON.stringify(antecedente)});
    try {
        const res = await fetch(req);
        if (!res.ok){
            console.log('error al inserta');
            return;
        }
        console.log('Se inserta');
    } catch (error) {
        console.log(error);
    }
};

const cargarPacientesDeMedico = async (id) => {
    try {
        const req = new Request(backend+ '/pacientes/'+id, {
            method: 'GET',
            headers: {}
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
}

const obtenerMedicoSession = async () => {
    try {
        const req = new Request(backend+ '/session/current', {
            method: 'GET',
            headers: {}
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
    const req = new Request(backend+'/citas/'+fecha,
    {method: 'GET',
     headers: { }
    });
try {
    const res = await fetch(req);
    if (!res.ok){
        console.log('error en traer horarios por fecha');
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
        