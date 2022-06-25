
var backend = "http://localhost:8080/Proyecto2Backend/api";

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
async function a(){
var medico = await obtenerMedicoSession();

var varia = document.getElementById('fotoPath');
varia.src = "/Proyecto2FrontEnd/img/"+medico.fotoPath;

let div= document.createElement('div');
var name = document.getElementById('name');

 div.innerHTML = ' <h5> '+medico.nombre+ '</h5>';
 
 name.appendChild(div);
}

a();
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});