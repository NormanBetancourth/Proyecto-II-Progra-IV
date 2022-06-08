var arrMedicos = new Array();
var medico = {nombre: "", id:"", especialidad:'', estado: false};
var urlLocal = "http://localhost:8080/Proyecto2FrontEnd/";
var barraMedicos = document.getElementById('div-barra-medicos');

function datosQuemados(){
    let medico1 = {nombre: "Hector", id:"123", especialidad:'General' ,estado: false};
    let medico2 = {nombre: "Rebeca", id:"321", especialidad:'Cardiologia' ,estado: false};
    let medico3 = {nombre: "Norman", id:"231", especialidad:'Cirujano' , estado: false};
    let medico4 = {nombre: "Brithany", id:"132", especialidad:'Enfermera' , estado: false};
    arrMedicos.push(medico1);
    arrMedicos.push(medico2);
    arrMedicos.push(medico3);
    arrMedicos.push(medico4);
}

//me agregara los div del medico a la barra de listar
function queueMedicosListar(){
    barraMedicos.innerHTML = '';
    let medicosHTML = '';
    arrMedicos.forEach(function(m){
       if(m.estado === false){
        medicosHTML+=createMed(m);
       }
    });
    barraMedicos.innerHTML = medicosHTML;
    agregarListenersBtn();
}

//agregara listeners a cada boton
function   agregarListenersBtn(){
    var btnAccept = document.querySelectorAll('.btn-list-accept');
    var btnReject = document.querySelectorAll('.btn-list-reject');
    for(var i = 0; i<btnAccept.length ; i++){
        btnAccept[i].addEventListener("click", actionAcceptMed);
        btnReject[i].addEventListener("click", actionRejectMed);
    }
}

//me crea un div del medico= con toda su info para mostrarlo en la lista de solicitudes
function createMed(Pmedico){
         return `
         <div id="medico-id" class="border border-2 shadow p-3 mb-5 bg-body rounded d-flex" data-cedula="${Pmedico.id}">
         <div id="img-med">
           <img src="../doc-1.jpg" class="img-thumbnail rounded-circle" alt="...">
         </div>
         <div id="info-med">
             <p class="p-padd">${Pmedico.nombre}</p>
             <p id="${Pmedico.id}" class="p-padd">${Pmedico.id}</p>
             <p class="p-padd">${Pmedico.especialidad}</p>
         </div>
         <div id="buttons-med">
            <button type="button" id="btn-accept-med" class="btn btn-success rounded-circle d-block btn-list-accept" data-ced='${Pmedico.id}' ><i class="fa-solid fa-check"></i></button>
            <button type="button" id="btn-reject-med" class="btn btn-danger rounded-circle d-block btn-list-reject" data-ced='${Pmedico.id}'><i class="fa-solid fa-x"></i></button>
         </div>
     </div>
          `;
}

//funcion que coloca el estado del medico en true (listado)
function medicoListado(id){
    arrMedicos.forEach(function(m){
        if(m.id === id){
            m.estado = true;
        }
    });
}

//listener que se activara cuando se le da click al check de un medico
function actionAcceptMed(event){
    event.preventDefault();
    //extrae el id del abuelo (es el que posee el id de la persona)
    let idMedico = $(this).attr('data-ced');
    console.log("Se activo el boton del id: "+idMedico);
    //voy a colocarle su estado en true
    medicoListado(idMedico);
    //Listo nuevamente la lista de medicos
    queueMedicosListar(); //se l ista nuevamente los medicos

}

//listener que se activara cuando se le da click al check de un medico
function actionRejectMed(event){
    event.preventDefault();
    console.log("Se ha rechazado el medico");
}


function actionLogout(event) {
    event.preventDefault();
    document.location = 'http://localhost:8080/Proyecto2FrontEnd/index.html';
}

function actionMedListados(event) {
    event.preventDefault();
    document.location = urlLocal + "Vistas/Admin/ver-med/admin-listadoMed.html";
}

function actionMedListar(event) {
    event.preventDefault();
    console.log("ENTRO A ESTOOO");
    document.location = urlLocal +"Vistas/Admin/listar-med/admin-listar.html";
}

function loaded(){
    //inicializamos el array con datos quemados para prueba
    datosQuemados();
    //evento logout para regresar index
    queueMedicosListar();
    //eventos
    $("#logout-id").on("click", actionLogout);
    $("#med-listados").on("click", actionMedListados);
    $("#med-listar").on("click", actionMedListar);

    $("#btn-accept-med").on("click", actionAcceptMed);
    $("#btn-reject-med").on("click", actionRejectMed);
}

document.addEventListener("DOMContentLoaded", loaded);


