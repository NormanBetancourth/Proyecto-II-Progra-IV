var backend = "http://localhost:8080/Proyecto2Backend/api";

const tableBody = document.getElementById('table-body');

tableBody.onclick = (e) => {
    console.log(e.target.dataset.id);
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