var arrMedicos = new Array();
var medico = {nombre: "", id:"", especialidad:'', estado: false};
var urlLocal = "http://127.0.0.1:5500/Proyecto2FrontEnd/"
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
    agregarListeners();
}
function  agregarListeners(){
    var bot = document.querySelectorAll('.btn-list');
    for(var i = 0; i<bot.length ; i++){
        bot[i].addEventListener("click", actionAcceptMed);
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
            <button type="button" id="btn-accept-med" class="btn btn-success rounded-circle d-block btn-list" data-ced='${Pmedico.id}' ><i class="fa-solid fa-check"></i></button>
            <button type="button" id="btn-reject-med" class="btn btn-danger rounded-circle d-block btn-list" data-ced='${Pmedico.id}'><i class="fa-solid fa-x"></i></button>
         </div>
     </div>
          `;
// var divMedico =document.createElement("div");
// divMedico.classList.add('border','border-2', 'shadow', 'p-3', 'mb-5' , 'bg-body', 'rounded', 'd-flex');

// //creo el div imagen y le agrego la img de hijo
// var divImagen = document.createElement("div");
// divImagen.setAttribute("id", "img-med")
// var imgMedico = document.createElement("img");
// imgMedico.classList.add('img-thumbnail', 'rounded-circle');
// imgMedico.setAttribute("src", '../doc-1.jpg');
// divImagen.appendChild(imgMedico);


// var divInfoMed = document.createElement("div");
// divInfoMed.setAttribute("id", "info-med")
// divInfoMed.setAttribute("data-cedula", Pmedico.id);
// //creo las etiquetas p y le agrego los textos con la informacion de cada medico
// var pName = document.createElement("p");
// pName.setAttribute("class", "p-padd");
// pName.appendChild(document.createTextNode(Pmedico.nombre));
// var pId = document.createElement("p");
// pId.setAttribute("class", "p-padd");
// pId.appendChild(document.createTextNode(Pmedico.id));
// var pEspec = document.createElement("p");
// pId.setAttribute("class", "p-padd");
// pEspec.appendChild(document.createTextNode(Pmedico.especialidad));
// //agregamos todas las p al sivInfoMed
// divInfoMed.append(pName, pId, pEspec);


// var divBotones = document.createElement("div");
// divBotones.setAttribute("id", "buttons-med")
// //creacion de boton aceptar
// var btnAccept = document.createElement("button");
// btnAccept.setAttribute('type', 'button');
// btnAccept.setAttribute('id', 'btn-accept-med');
// btnAccept.setAttribute('data-ced', Pmedico.id);
// btnAccept.classList.add('btn', 'btn-success', 'rounded-circle', 'd-block');
// var iconA = document.createElement("i");
// iconA.classList.add('fa-solid', 'fa-check');
// btnAccept.appendChild(iconA);
// //Agregamos listener a aceptar
// btnAccept.addEventListener("click", actionAcceptMed);
// //creacion de boton rechazar
// var btnReject = document.createElement("button");
// btnReject.setAttribute('type', 'button');
// btnReject.setAttribute('id', 'btn-reject-med');
// btnReject.setAttribute('data-ced', Pmedico.id);
// btnReject.classList.add('btn', 'btn-danger', 'rounded-circle', 'd-block');
// var iconB = document.createElement("i");
// iconB.classList.add('fa-solid', 'fa-x');
// btnReject.appendChild(iconB);
// //SE le agrega listener
// btnReject.addEventListener("click", actionRejectMed);
// //agregamos los botones al div
// divBotones.append(btnAccept, btnReject);

// divMedico.append(divImagen,divInfoMed,divBotones);
// barraMedicos.appendChild(divMedico); 
}

//funcion que coloca el estado del medico en true (listado)
function medicoListado(id){
    arrMedicos.forEach(function(m){
        if(m.id === id){
            m.estado = true;
        }
    });
}

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

function actionRejectMed(event){
    event.preventDefault();
    console.log("Se ha rechazado el medico");
}

function actionLogout(){
    document.location = urlLocal+"index.html";
}

function loaded(){
    //inicializamos el array con datos quemados para prueba
    datosQuemados();
    //evento logout para regresar index
    queueMedicosListar();
    //eventos
    $("#logout-id").on("click", actionLogout);
    $("#btn-accept-med").on("click", actionAcceptMed);
    $("#btn-reject-med").on("click", actionRejectMed);
}

document.addEventListener("DOMContentLoaded", loaded);


