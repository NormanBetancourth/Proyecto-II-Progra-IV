var arrMedicos = new Array();
var medico = {clinica: "", especialidad: "", estado:"", fee:"", fotoPath:"", id:"", localidad:'', nombre: "", password:"", presentacion:"", tipo:""};
var urlLocal = "http://localhost:8080/Proyecto2FrontEnd/";
var backend = "http://localhost:8080/Proyecto2Backend/api";
var barraMedicos = document.getElementById('div-barra-medicos');
var containerPopup =  document.getElementById('infoPopupMed');

function fetchAndList() {
    const request = new Request(backend + '/medicos', {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log("Error");
                return;
            }
            arrMedicos = await response.json();
            queueMedicosListados();
        } catch (e) {
            console.log('Error ocurrido en el fetchAndList');
        }
    })(); 
}

function edit(cedula) {
    let medicoB;
    const request = new Request(backend + '/medicos/' + cedula, {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log("Error edit 1");
                return;
            }
            medicoB = await response.json();
        } catch (e) {
            console.log("Error edit 2");
        }
    })();
}

//me agregara los div del medico a la barra de listar
function queueMedicosListados() {
    barraMedicos.innerHTML = '';
    let medicosHTML = '';
    arrMedicos.forEach(function (m) {
        if (m.estado === "Aprobado") {
            medicosHTML += createMed(m);
        }
    });
    barraMedicos.innerHTML = medicosHTML;
    agregarListenersBtn();
}

function   agregarListenersBtn(){
    var seeMedPopup = document.querySelectorAll('.btn-see-med');
    for(var i = 0; i<seeMedPopup.length ; i++){
        seeMedPopup[i].addEventListener("click", actionSeeMedicoPopup);
    }
}

function actionSeeMedicoPopup(event){
   event.preventDefault();
   let idMedico=$(this).attr('data-ced');
   togglePopupAbrir(idMedico);
}

function retornarMedico(idMedico){
   let medico = {};
   arrMedicos.forEach(function(m){
       if(m.id === idMedico){
            medico = m;
       }
   });
   return medico;
}

function togglePopupAbrir(idMedico){
    containerPopup.innerHTML = '';
    containerPopup.innerHTML = createInfoPopupMed(retornarMedico(idMedico));
    //se abre el popup
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("popup").classList.toggle("active"); 
}

function togglePopupCerrar(){
    containerPopup.innerHTML = '';
    //Se cierra el popup
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("popup").classList.toggle("active"); 
}

function createInfoPopupMed(Pmedico){
    console.log(Pmedico);
    return `
    <div id="img-medic-pop">
       <img src="../doc-1.jpg" class="img-thumbnail rounded-circle" alt="...">
    </div>
    <div id="info-medic-pop">
       <p id="p-nom-med" class="fs-5">${Pmedico.nombre}</p>
       <p id="p-info-med"> <b>Identificacion:</b> ${Pmedico.id}</p>
       <p id="p-info-med"> <b>Especialidad:</b> ${Pmedico.especialidad}</p>
       <p id="p-info-med"> <b>Area:</b> Alajuela </p>
       <p id="p-info-med"> <b>Costo:</b> 5000 </p>
       <p id="p-info-med"> <b>Frecuencia:</b> 20 minutos </p>
   </div>
   <div id="horario-medic-pop">
       <p> <b>Horario:</b> L-M </p>
   </div>`;
}

function createMed(Pmedico){
    return `
    <div id="medico-id" class="border border-2 shadow p-3 mb-5 bg-body rounded d-flex" data-ced="${Pmedico.id}">
       <div id="img-med">
          <img src="../doc-1.jpg" class="img-thumbnail rounded-circle" alt="...">
       </div>
       <div id="info-med">
           <p class="p-padd">${Pmedico.nombre}</p>
           <p id="${Pmedico.id}" class="p-padd">${Pmedico.id}</p>
           <p class="p-padd">${Pmedico.especialidad}</p>
       </div>
       <div id="buttons-med">
          <button type="button" id="btn-see-med" class="btn btn-info btn-see-med" data-ced='${Pmedico.id}'><i class="fa-solid fa-eye"></i></button>
       </div>
       </div>`;
}

function actionLogout(event){
    event.preventDefault();
    document.location = 'http://localhost:8080/Proyecto2FrontEnd/index.html';
}

function actionMedListados(event){
    event.preventDefault();
    document.location = urlLocal+"Vistas/Admin/ver-med/admin-listadoMed.html";
 }

 function actionMedListar(event){
    event.preventDefault();
    document.location = urlLocal+"Vistas/Admin/listar-med/admin-listar.html";
 }

 function actionRegresarPopup(event){
     event.preventDefault();
     renderPopup();
 }

function loaded(){
    //extraemos la lista de medicos de la DB
    fetchAndList();
    //eventos
    $("#logout-id").on("click", actionLogout);
    $("#med-listados").on("click", actionMedListados);
    $("#med-listar").on("click", actionMedListar);
    $("#btnRegresarPop").on("click", togglePopupCerrar);

}
$(loaded);