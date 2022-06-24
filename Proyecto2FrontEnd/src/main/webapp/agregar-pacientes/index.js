var backend = "http://localhost:8080/Proyecto2Backend/api";


const addPaciente = async () => {
    const idPaciente = document.getElementById('paciente-id');
    const nombrePaciente = document.getElementById('paciente-nombre');
    const telefonoPaciente = document.getElementById('paciente-telefono');
    const fotoPaciente = document.getElementById('paciente-foto');

    

    var result = await pacienteGET(idPaciente.value);
    
    if(result.id == '') {
        console.log(idPaciente.value);
        console.log(nombrePaciente.value);
        console.log(telefonoPaciente.value);
        console.log(fotoPaciente.value);

        var doctor = await obtenerMedicoSession();
        
        var newUser = { 
            idMed:doctor.id,
            telefono: telefonoPaciente.value,
            fotoPath: fotoPaciente.value,//TODO: agregar las opciones para agregar una pic
            nombre: nombrePaciente.value,
            id: idPaciente.value,
            tipo: 'Paciente'
        };
        await pacientePOST(newUser);
        idPaciente.value = '';
        nombrePaciente.value = '';
        telefonoPaciente.value = '';
        fotoPaciente.value = '';

        
        
    }else{
        alert(`Ya existe un usuario con el id ${idPaciente.value}`);
        return;
    }



};

//REST API
const pacienteGET = async (id) => {
    try {
        const req = new Request(backend + "/pacientes/data/" + id, {
          method: "GET",
          headers: {},
        });
    
        const res = await fetch(req);
        if (!res.ok) {
          console.log("error al guardad user de session");
          return undefined;
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

const pacientePOST = async (paciente) => {
    const req = new Request(backend + "/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente),
    });
    try {
      const res = await fetch(req);
      if (!res.ok) {
        console.log("error agregar un paciente");
        return;
      }
      console.log("Se inserta el paciente");
    } catch (error) {
      console.log(error);
    }
  };




const load = () => {
    const element = document.querySelector("form");
    element.addEventListener("submit", (event) => {
      event.preventDefault();
    });
};
document.addEventListener("DOMContentLoaded", load);