const table = document.getElementById('table-container');
const tableBody = document.getElementById('table-body');
var backend = "http://localhost:8080/Proyecto2Backend/api";

var pacientes = [];
var medico;


table.onclick = (e) => {
    if(e.target.dataset.event != undefined){
        console.log(e.target.dataset.id);
        console.log(e.target.dataset.event);
    }
};



const load = async () => {
    medico = await obtenerMedicoSession();
    pacientes = await cargarPacientesDeMedico(medico.id);
    loadUsersOnView();

};

const loadUsersOnView = async () => {
    var content = '';
    pacientes.forEach(user => {
        console.log(user);
        content += `<tr data-id="${user.id}" data-event="info">
                    <th data-id="${user.id}" data-event="info" scope="row">${user.id}</th>
                    <td data-id="${user.id}" data-event="info">${user.nombre}</td>
                    <td data-id="${user.id}" data-event="info">
                        <button data-id="${user.id}" data-event="edit"  class="btn btn-info">Edit</button>
                    </td>
                    <td data-id="${user.id}" data-event="info">
                        <button data-id="${user.id}" data-event="apoiment"  class="btn btn-primary">Add Apoiment</button>
                    </td>
                </tr>`
    });


     tableBody.innerHTML = content;
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

document.addEventListener("DOMContentLoaded", load);