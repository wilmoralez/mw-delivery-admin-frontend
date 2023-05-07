var motoristas;
var adminActual=JSON.parse(localStorage.getItem('AdminActual'));
function mostrarSeccion(idSeccion) {
    // Ocultar todas las secciones
    document.getElementById("usuario-nombre").innerHTML=adminActual.nombre;
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

obtenerMotoristas=()=>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:8000/motoristas/", requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result)
    motoristas=result;
    renderizarMotoristas()})
    .catch(error => console.log('error', error));
};

renderizarMotoristas=()=>{
  mostrarSeccion(2);
  document.getElementById("cuerpo-motoristas").innerHTML='';
  n=0;
  motoristas.forEach(motorista => {
    document.getElementById("cuerpo-motoristas").innerHTML+=`<tr>
    <td>${n+1}</td>
    <td>${motorista.nombre +' '+ motorista.apellido}</td>
    <td>${motorista.telefono}</td>
    <td><button type="button" onclick=detalleMotorista(${n}) class="btn btn-info" data-toggle="modal" data-target="#infoModal"><i class="fas fa-info"></i></button></td>
  </tr>`
 n++;
  });
}

detalleMotorista=(n)=>{
  document.getElementById("cuerpo-detalle").innerHTML=` <p><strong>Email:</strong> ${motoristas[n].correo}</p>
  <p><strong>Nombre motorista:</strong>${motoristas[n].nombre+' '+motoristas[n].apellido}</p>
  <p><strong>DNI:</strong> ${motoristas[n].dni}</p>
  <p><strong>Teléfono:</strong> ${motoristas[n].telefono}</p>
  <p><strong>Dirección:</strong> ${motoristas[n].direccion}</p>
  <p><strong>Ciudad:</strong> ${motoristas[n].ciudad}</p>
  <p><strong>Licencia:</strong> ${motoristas[n].licencia}</p>
  <p><strong>Placa:</strong> ${motoristas[n].placa}</p>
  <p><strong>Experiencia:</strong> ${motoristas[n].experiencia}</p>
  <p><strong>Disponibilidad:</strong> ${motoristas[n].disponibilidad}</p>`
  
  document.getElementById("modal-footer").innerHTML=`<button type="button" onclick="eliminar('${motoristas[n]._id}')" class="btn btn-secondary" data-dismiss="modal">Rechazar</button>
  <button type="button" class="btn btn-secondary" onclick="aceptar('${motoristas[n]._id}')" data-dismiss="modal">Aceptar</button>`
}

aceptar=(n)=>{
  console.log(`Se acepto ${n}`);
  console.log(n);
  var requestOptions = {
    method: 'PUT',
    redirect: 'follow'
  };
  
  fetch(`http://localhost:8000/motoristas/${n}`, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result)
    obtenerMotoristas();})
    .catch(error => console.log('error', error));
}

eliminar=(n)=>{
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch(`http://localhost:8000/motoristas/${n}`, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result)
      obtenerMotoristas()})
    .catch(error => console.log('error', error));
}