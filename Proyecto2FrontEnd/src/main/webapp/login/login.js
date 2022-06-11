var medicos = new Array();
var adminis = new Array();
var backend = "http://localhost:8080/Proyecto2Backend/api";
const NET_ERR = 999;
var arrMedicos2 = new Array();
var user = { id: "", pwd: "" };

const loadUser = () => {
  user.pwd = document.querySelector("#pwd-usr").value;
  user.id = document.querySelector("#id-usr").value;
};

function login() {
  (async () => {
    try {
      loadUser();
      result = await search(user.id);
      await fetchAndList();
      console.log(result);
      

      if (result === undefined) {
        errorMessage(404, $("#errorDiv"));
      } else {
          localStorage.setItem("user", JSON.stringify(result));
          window.location.href = "./inicio/index.html";
        
      }
    } catch (error) {
      console.log(error);
      errorMessage(NET_ERR, $("#errorDiv"));
    }
  })();
}

function arrPrint(arr){
    arr.forEach(function (m) {
        console.log(m.id);
    });
}

function fetchAndList() {
    const request = new Request(backend + '/medicos', {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
               console.log("ERROR FETCH");
                return;
            }
            arrMedicos2 = await response.json();
            arrPrint(arrMedicos2);
        } catch (e) {
            // errorMessage(NET_ERR,$("#buscarDiv #errorDiv"));
            console.log(e);
        }
    })();
} 

const search = async (id) => {
  try {
    const req = new Request(backend + "/medicos/" + id, {
      method: "GET",
      headers: {},
    });
    const res = await fetch(req);
    if (!res.ok) {
      console.log("Datos inválido");
      return;
    }
    var result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};


errorMessage = (status, place) => {
  switch (status) {
    case 404:
      error = "Registro no encontrado";
      break;
    case 666:
      error = "Usuario o contraseña incorrecta";
      break;
    case 403:
    case 405:
      error = "Usuario no autorizado";
      break;
    case 406:
    case 405:
      error = "Usuario ya existe";
      break;
    case NET_ERR:
      error = "Error de comunicación";
      break;
  }
  place[0].innerHTML =
    '<div class="alert alert-danger fade show">' +
    '<h4 class="alert-heading">Error!</h4>' +
    error +
    "</div>";
  return;
};



const load = () => {
  $("form").submit(function (e) {
    e.preventDefault();
  });
  
};

const singIn = () => {
    localStorage.setItem('user', null);
    window.location.href = "./sing-in/index.html";
};

document.addEventListener("DOMContentLoaded", load);
