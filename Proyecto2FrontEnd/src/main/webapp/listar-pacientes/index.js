const table = document.getElementById('table-container');
const tableBody = document.getElementById('table-body');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
var backend = "http://localhost:8080/Proyecto2Backend/api";




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
            await loadAntecedentesView(objEvent.id);//TODO: hacer antecedentes
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

            await loadAgendarView(objEvent.id);//TODO: hacer agenda cita
            $("#modal-container").modal("show");
        }
    }
};



const loadAntecedentesView = async (id) =>{
    
    let antecedentesDePaciente = await antecedentesGET(id);
    console.log(antecedentesDePaciente);
    let infoAntecedentes = `    <div class="row">
                                <div class="col"></div>
                                <div class="col-10" >
                                    <div class="row align-items-center text-center mt-2">
                                        <h4>Antecedentes</h4>
                                    </div>
                                    <form onsubmit="">
                                    <div class="row">
                                            <div class="col"></div>
                                            <div class="col   text-center">
                                                <div class="form-group py-3">
                                                    <label for="exampleInputEmail1">Tipo de antecedente</label>
                                                    <input type="text" class="form-control" id="id-usr" aria-describedby="emailHelp"  required>
                                                </div>
                                                <div class="form-group my-1 ">
                                                    <label for="exampleInputPassword1">Detalles</label>
                                                    <div class="row align-items-center text-center my-3">
                                                        <textarea type="text" style="min-height: 100px; resize: none;"   id="id-usr"  required></textarea>
                                                        <div class="col mt-4">
                                                            <button type="button" class="btn btn-primary">Agregar antecedente</button>
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


    
};

const loadInfoView = async (id) =>{
    //TODO: Hacer que edite la pic
    let pacienteInfo = await cargarPacientePorId(id);
    console.log(pacienteInfo);
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
        console.log(user);
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

//REST API METHODS
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
        console.log('Nombre diff');
        patient.nombre = patientName;
        ban = true;
    }

    if(patient.fotoPath != patientFoto ){
        console.log('Foto diff');
        patient.fotoPath = patientFoto;
        ban = true;
    }
    
    if(patient.telefono != patientTelefono){
        console.log('Telefono diff');
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


//LOAD
const load = async () => {
    medico = await obtenerMedicoSession();
    pacientes = await cargarPacientesDeMedico(medico.id);
    loadUsersOnView();
};

document.addEventListener("DOMContentLoaded", load);
        