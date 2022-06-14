var arrMedicos = new Array();
//clinica,especialidad,estado,fee,fotoPath,id,localidad,nombre,password,presentacion,tipo
var medico = {clinica: "", especialidad: "", estado:"", fee:"", fotoPath:"", id:"", localidad:'', nombre: "", password:"", presentacion:"", tipo:""};
var urlLocal = "http://localhost:8080/Proyecto2FrontEnd/";
var barraMedicos = document.getElementById('div-barra-medicos');
var backend = "http://localhost:8080/Proyecto2Backend/api";


function arrPrint(arr){
    arr.forEach(function (m) {
        console.log(Object.values(m)+"---"+Object.keys(m));
    });
}

//actualiza el estado del medico
function updateEstadoMedico(id, estado) {
    const request = new Request(backend + '/medicos/' + id + '/'+estado, {method: 'PUT', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                console.log("Error en el updateEstadoMedico 1"); return;
            }
            fetchAndList();
        } catch (e) {
             console.log("Error en el updateEstadoMedico 2"); return;
        }
    })();
}

//Obtiene la lista de medicos
 function fetchAndList(){
    const request = new Request(backend+'/medicos', {method: 'GET', headers: { }});
    (async ()=>{
        try{
            const response = await fetch(request);
            if (!response.ok) {console.log("Error");return;}
            arrMedicos = await response.json();
            queueMedicosListar();
        }
        catch(e){
           // errorMessage(NET_ERR,$("#buscarDiv #errorDiv"));
           console.log('Error ocurrido en el fetchAndList');
        }         
    })();    
 } 

//me agregara los div del medico a la barra de listar
function queueMedicosListar(){
    barraMedicos.innerHTML = '';
    let medicosHTML = '';
    arrMedicos.forEach(function(m){
       if(m.estado === "Espera"){
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
            updateEstadoMedico(id,"Aprobado" );
        }
    });
}

function medicoRechazar(id){
    arrMedicos.forEach(function(m){
        if(m.id === id){
            updateEstadoMedico(id,"Rechazado");
        }
    });
}

//listener que se activara cuando se le da click al check de un medico
function actionAcceptMed(event){
    event.preventDefault();
    //extrae el id del abuelo (es el que posee el id de la persona)
    let idMedico = $(this).attr('data-ced');
    //voy a colocarle su estado en true y listo los medicos en el array
    medicoListado(idMedico);
}

//listener que se activara cuando se le da click al check de un medico
function actionRejectMed(event){
    event.preventDefault();
    let idMedico = $(this).attr('data-ced');
    medicoRechazar(idMedico);
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

async function loaded(){
    //extraemos el array de la base de datos
     arrPrint(arrMedicos);
    //evento logout para regresar index
    //eventos
    $("#logout-id").on("click", actionLogout);
    $("#med-listados").on("click", actionMedListados);
    $("#med-listar").on("click", actionMedListar);

    $("#btn-accept-med").on("click", actionAcceptMed);
    $("#btn-reject-med").on("click", actionRejectMed);
}

  function loaded(){
    fetchAndList();
    $("#logout-id").on("click", actionLogout);
    console.log("AAAA1");
    $("#med-listados").on("click", actionMedListados);
    console.log("AAAA2");
    $("#med-listar").on("click", actionMedListar);
    console.log("AAAA3");
    $("#btn-accept-med").on("click", actionAcceptMed);
    $("#btn-reject-med").on("click", actionRejectMed);
  }
  
  $(loaded);


