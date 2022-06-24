var backend = "http://localhost:8080/Proyecto2Backend/api";
const modalCloseBtn = document.getElementById("modal-close-btn");

const tableBody = document.getElementById('table-body');
const modalBody = document.getElementById("modal-body");

modalCloseBtn.onclick = () => {
    $("#modal-container").modal("hide");
};

tableBody.onclick = (e) => {

    loadCitasPorPaciente(e.target.dataset.id);
};

const loadCitasPorPaciente = async (id) => {

    var citasPorPaciente = await citasGET(id)
    var content = `
    <table class="table table-hover">
        <thead class="text-center align-items-center">
        <tr>
            <th scope="col">Estado</th>
            <th scope="col">Fecha</th>
            <th scope="col">Motivo</th>
            <th scope="col">ID</th>
        </tr>
        </thead>
        <tbody class="text-center align-items-center" id="modal-table-body">
        
        </tbody>
    </table>
    `;
    modalBody.innerHTML = content;

    const modalTableBody = document.getElementById('modal-table-body');
    var contentDates = ``;

    citasPorPaciente.forEach(element =>{
        console.log(element);
        if(element.estado != 'Cancelado'){
            contentDates += `
            <tr data-id="${element.medicamentos}" >
                <th scope="row" data-id="${element.medicamentos}" >${element.estado}</th>
                <td  data-id="${element.medicamentos}" >${element.fecha}</td>
                <td data-id="${element.medicamentos}" >${element.motivo}</td>
                <td data-id="${element.medicamentos}" >${element.medicamentos}</td>
            </tr>
            `;

        }
    });

    modalTableBody.innerHTML = contentDates;

    modalTableBody.onclick = (e) => {
        console.log(e.target.dataset.id);
    };

    $("#modal-container").modal("show");
};

//REST API
const citasGET = async (id) =>{
    try {
        const req = new Request(backend + "/citas/paciente/"+id, {
          method: "GET",
          headers: {},
        });
    
        const res = await fetch(req);
        if (!res.ok) {
          console.log("error al Citas de un paciente");
          return;
        }
        var result = await res.json();
        return result;
      } catch (error) {
        console.log(error);
      }

};


const pacientesGET = async () => {
    try {
      const req = new Request(backend + "/pacientes", {
        method: "GET",
        headers: {},
      });
  
      const res = await fetch(req);
      if (!res.ok) {
        console.log("error Cargar los pacientes del medico");
        return;
      }
      var result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const loadPatientsView = async () => {
    var pacientes = await pacientesGET();
    var content = ``;

    pacientes.forEach(element =>{
        content += `
            <tr data-id="${element.id}">
                <th scope="row" data-id="${element.id}" >${element.id}</th>
                <td data-id="${element.id}" >${element.nombre}</td>
                <td data-id="${element.id}" >👁</td>
            </tr>
        `;
    });

    tableBody.innerHTML = content;


  };

const load =  () => {
    loadPatientsView();
    
};
  
  document.addEventListener("DOMContentLoaded", load);