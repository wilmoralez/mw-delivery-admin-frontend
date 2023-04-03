function mostrarSeccion(idSeccion) {
    // Ocultar todas las secciones

    var secciones = document.getElementsByTagName('section');
    for (var i = 0; i < secciones.length; i++) {
       
      secciones[i].style.display = 'none';
      console.log(i);
     
    }
    console.log(secciones);
    // Mostrar la sección seleccionada
    var seccion = document.getElementById(idSeccion);
    seccion.style.display = 'block';
    console.log(`mostrando seccion ${idSeccion}`)
   
  }
