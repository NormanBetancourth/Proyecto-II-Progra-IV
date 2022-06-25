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
        contentDates += `
        <tr data-id="${element.codigo}" >
            <th scope="row" data-id="${element.codigo}" >${element.estado}</th>
            <td  data-id="${element.codigo}" >${element.fecha}</td>
            <td data-id="${element.codigo}" >${element.motivo}</td>
            <td data-id="${element.codigo}" >${element.codigo}</td>
        </tr>
        `;
        // if(element.estado != 'Cancelado'){

        // }
    });

    modalTableBody.innerHTML = contentDates;

    modalTableBody.onclick = async (e) => {
      var citaView;
      citasPorPaciente.forEach(element=>{
        if (element.codigo == e.target.dataset.id){
          citaView = element;
        }
      });
      loadCitaView(citaView);
        
    };

    $("#modal-container").modal("show");
};

const loadCitaView = (cita) => {
  
  if (cita.estado == "Registrado"){
    console.log(cita);

    atenderCita(cita);
  }else{
    verCita(cita)

  }

  
};

const atenderCita = (cita) => {
  modalBody.innerHTML = `
  <form onsubmit="citasPOST">
  <div class="row">
          <div class="col"></div>
          <div class="col-10   text-center">
              <div class="row align-items-center text-center">
        
                <div class="col-1">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Codigo Cita</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6>${cita.codigo}</h6>
                </div>
                </div>

                <div class="col-2"></div>
                <div class="col-1 ">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Nombre Paciente</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6 id='cita-nombre' data-id-paciente = '${cita.paciente.id}'  >${cita.paciente.nombre}</h6>
                </div>
                </div>
                <div class="col-2"></div>

                <div class="col-1 ">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Fecha</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6 id='cita-fecha' >${cita.fecha}</h6>
                </div>
                </div>
                
                <div class="col-2"></div>
                
                <div class="col-1 ">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Estado</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6 id = 'cita-estado' >${cita.estado}</h6>
                </div>
                </div>
              </div>
              <div class="row my-5 align-items-center text-center">
                <h4>Ingresar Datos de la Cita</h4>
                <div class="col"></div>
                
                <div class="col-5 align-items-center text-center">
                  
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Motivo</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-motivo" style="min-height: 80px; resize: none;"   required>${cita.motivo}</textarea>
                    </div>


                  </div>
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Diagnostico</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-diagnostico" style="min-height: 80px; resize: none;"    required>${cita.diagnostico}</textarea>
                    </div>
                  </div>

                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Medicamentos</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-medicamentos" style="min-height: 80px; resize: none;"    required>${cita.medicamentos}</textarea>
                    </div>
                  </div>

                  
                  
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Pescripciones</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-pescripciones" style="min-height: 80px; resize: none;"    required>${cita.prescripciones}</textarea>
                    </div>
                  </div>
                  
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Signos</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-signos" style="min-height: 80px; resize: none;"     required>${cita.signos}</textarea>
                    </div>
                  </div>



                </div>
              
              <div class="col"></div>
              </div>
              <div class="row">
                <div class="col mt-4">
                  <button type="submit" class="btn btn-primary">Aceptar</button>
                  <button type="button" id="btn-cancel" data-id-cita='${cita.codigo}' class="btn btn-danger">Cancelar</button>
                </div>
              </div>
             
          </div>
          <div class="col"></div>
  </div>
  </form>`;


  const btnCancel= document.getElementById('btn-cancel');
  console.log(btnCancel);
  btnCancel.onclick = (e) =>{
    citasDELETE(e.target.dataset.idCita);
    $("#modal-container").modal("hide");
  }

};
const verCita = (cita) => {

  modalBody.innerHTML = `

  <div class="row">
          <div class="col"></div>
          <div class="col-10   text-center">
              <div class="row align-items-center text-center">
        
                <div class="col-1">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Codigo Cita</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6>${cita.codigo}</h6>
                </div>
                </div>

                <div class="col-2"></div>
                <div class="col-1 ">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Nombre Paciente</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6 id='cita-nombre' data-id-paciente = '${cita.paciente.id}'  >${cita.paciente.nombre}</h6>
                </div>
                </div>
                <div class="col-2"></div>

                <div class="col-1 ">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Fecha</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6 id='cita-fecha' >${cita.fecha}</h6>
                </div>
                </div>
                
                <div class="col-2"></div>
                
                <div class="col-1 ">
                  <div class="form-group py-3">
                    <label for="exampleInputEmail1">Estado</label>
                </div>                  
                <div class="form-group py-1 text-center align-items-center">
                  <h6 id = 'cita-estado' >${cita.estado}</h6>
                </div>
                </div>
              </div>
              <div class="row my-5 align-items-center text-center">
                <h4>Ingresar Datos de la Cita</h4>
                <div class="col"></div>
                
                <div class="col-5 align-items-center text-center">
                  
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Motivo</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-motivo" style="min-height: 80px; resize: none;"   readonly>${cita.motivo}</textarea>
                    </div>


                  </div>
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Diagnostico</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-diagnostico" style="min-height: 80px; resize: none;"    readonly>${cita.diagnostico}</textarea>
                    </div>
                  </div>

                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Medicamentos</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-medicamentos" style="min-height: 80px; resize: none;"    readonly>${cita.medicamentos}</textarea>
                    </div>
                  </div>

                  
                  
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Pescripciones</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-pescripciones" style="min-height: 80px; resize: none;"    readonly>${cita.prescripciones}</textarea>
                    </div>
                  </div>
                  
                  <div class="form-group my-5 ">
                    <label for="exampleInputPassword1">Signos</label>
                    <div class="row align-items-center text-center my-3">
                        <textarea type="text"  id="cita-signos" style="min-height: 80px; resize: none;"     readonly>${cita.signos}</textarea>
                    </div>
                  </div>



                </div>
              
              <div class="col"></div>
              </div>
              
             
          </div>
          <div class="col"></div>
  </div>
  `;
};

//REST API


const citasDELETE = async (id) => {
  const req = new Request(backend + "/citas/cancelar/"+id, {
    method: "POST",
    headers: {}
  });
  try {
    const res = await fetch(req);
    if (!res.ok) {
      console.log("error al cancelar cita");
      return;
    }
    console.log("Se cancela la cita");
  } catch (error) {
    console.log(error);
  }

};
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
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
      }

};

const citasPOST= async () => {
  console.log('entra');

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