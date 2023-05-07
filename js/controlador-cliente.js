const imagenes = document.querySelectorAll('#slider img');
let imagenActual = 0;
let interval;
var clienteActual = {};


function startSlider() {
	imagenes[imagenActual].classList.add('active');

	interval = setInterval(() => {
		imagenes[imagenActual].classList.remove('active');
		imagenActual++;
		if (imagenActual >= imagenes.length) {
			imagenActual = 0;
		}
		imagenes[imagenActual].classList.add('active');
	}, 5000);
}
startSlider();

//Función para mostrar y ocultalr las secciones
function mostrarSeccion(idSeccion) {
    // Ocultar todas las secciones
    var secciones = document.getElementsByTagName('section');
    for (var i = 0; i < secciones.length; i++) {
       
      secciones[i].style.display = 'none';
    }
    console.log('Id seccion actual: '+ idSeccion); 
    // Mostrar la sección seleccionada
    var seccion = document.getElementById(idSeccion);
    seccion.style.display = 'block';
  }
  mostrarSeccion(0);

  //Funcion para cambiar de un html a otro y mostrar una seccion especifica
  window.onload = function() {
    var seccionEspecifica = window.location.hash.substring(1);
    if (seccionEspecifica) {
      mostrarSeccion(seccionEspecifica);
    }
  };

const autenticarCliente = () => {
    var localStorage = window.localStorage;
    let txtemail = document.getElementById('email-inicio').value;
    let txtpassword = document.getElementById('password-inicio').value;
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "email": txtemail,
      "password": txtpassword
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8000/clientes/autenticar", requestOptions)
      .then(response => response.json())
      .then(result => {
        clienteActual = result; 
        localStorage.setItem('IdClienteActual', clienteActual._id);
        mostrarSeccion(3);
      })
      .catch(error => console.log('error', error));
}

  function seleccionarTienda(codTienda){
    localStorage.setItem('tiendaActual', codTienda);
  }


  //Funciones para validar correo y contraseña mediante expresiones regulares
  function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }
  
  function validarPassword(password) {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regexPassword.test(password);
  }

  //Validaciondes de registro de nuevos clientes
  document.getElementById('btnCrearCuenta').addEventListener('click', function() {
    const formularioRegistro = document.getElementById('formulario-registro');
    const email = document.getElementById('emailRegistro').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    const nombreCliente = document.getElementById('nombre-cliente').value;

    const campos = formularioRegistro.querySelectorAll("input, select, textarea");
    if (!validarEmail(email)) {
      alert('El correo electrónico no es válido');
      return;
    }
  
    if (!validarPassword(password1) || !validarPassword(password2) || password1!==password2) {
      alert('Contraseña no válida. La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
      return;
    }

    let formularioCompleto = true;
    campos.forEach(function(campo) {
      if (!campo.value) {
        formularioCompleto = false;
      }
    });
  
    if (formularioCompleto) {
      crearCuenta();
      alert('¡Hola '+ nombreCliente + '!, tu cuenta ha sido creada exitosamente, ahora eres parte de la familia MW Fashion Delivery :)');
    } else {
      alert("Por favor, completa todos los campos del formulario.");
      return;
    }

    mostrarSeccion(1);
  });
  
  function crearCuenta(){
    let txtcorreo = document.getElementById('emailRegistro').value;
    let txtcontraseña = document.getElementById('password2').value; 
    let txtnombre = document.getElementById('nombre-cliente').value; 
    let txtapellido = document.getElementById('apellido-cliente').value; 

    fetch('http://localhost:8000/clientes', {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
           email: txtcorreo,
           password: txtcontraseña,
           nombre: txtnombre,
           apellido: txtapellido
        })
      })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    }) 
  }
   

  