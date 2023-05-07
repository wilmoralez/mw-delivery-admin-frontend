//Función para mostrar y ocultalr las secciones
function mostrarSeccion(idSeccion) {
    // Ocultar todas las secciones
    var secciones = document.getElementsByTagName('section');
    for (var i = 0; i < secciones.length; i++) {
       
      secciones[i].style.display = 'none';
    }
    console.log('seccion tienda: ', idSeccion);
    // Mostrar la sección seleccionada
    var seccion = document.getElementById(idSeccion);
    seccion.style.display = 'block';
  }
  mostrarSeccion(0);

  const atras = (id) => {
    document.getElementById('foot-categorias').style.display="block";
    mostrarSeccion(id);
  }

  const mostrarProductos = (id) => {
    document.getElementById('foot-categorias').style.display="none";
    mostrarSeccion(id);
  }

  function volverATiendas(url) {
    window.location.href = url;
  }

  

  
