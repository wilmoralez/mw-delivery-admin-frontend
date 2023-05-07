//Arreglo que almacena los productos agregados al carrito de compras 
let carrito = [];
var localStorage = window.localStorage;
var codTienda = localStorage.getItem('tiendaActual');
let tienda = {}
let categorias = {}

//Obteniendo empresas
const obtenerEmpresa = () => {
    fetch(`http://localhost:8000/empresas/${codTienda}`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    tienda=result; 
    console.log(result);
}) 
}
obtenerEmpresa(); 

//Obteniendo categorias de genero y producto 
const obtenercategorias = () => {
    fetch(`http://localhost:8000/categorias/${codTienda}`, {
        method: 'GET', 
        headers: {
            "Content-Type": "application/json", 
          }
        })
  .then(response => response.json())
  .then(result => {
    categorias=result; 
    console.log(result);
    mostrarTienda();
    renderizarNavbar();
}) 
}
obtenercategorias();

function renderizarNavbar () {
    document.getElementById(`nav-${codTienda}`).innerHTML =
    `
    <i class="fas fa-bars"></i>
    <i class="fa-solid fa-angles-left" onclick="volverATiendas('index-cliente.html#3')" ></i>
    <button type="button" data-bs-toggle="modal" data-bs-target="#modalCliente">
        <i class="fas fa-user"></i>
    </button> 
    
    `
}

function mostrarTienda () {
    let estrellas = '';
    for (let i=0; i<tienda.calificacion; i++){
        estrellas += '<i class="fa-solid fa-star"></i> ';
    }
    for(let i=0; i<5-tienda.calificacion; i++){
        estrellas += '<i class="fa-regular fa-star"></i> ';
    }
    document.getElementById(codTienda). innerHTML = 
    `
    <div>
    <img style="width:180px; height: 30px; margin: 2rem;"  src="./img/${tienda.logo}" >
       </div>
       <div style="color:#FFBA00">
       ${estrellas}
       </div>
       <br>
       <div style="margin: 0 2rem; text-align:justify">
       <p>${tienda.descripcion}<p>
       </div>
       <br>
       <div >
       </div>
       <div class="genero" style="background-image:url(./img/${categorias.categorias[0].portada})" onclick="mostrarSeccion(1)">
           <h1>MUJER</h1>
       </div>
       <div class="genero" style="background-image:url(./img/${categorias.categorias[1].portada})" onclick="mostrarSeccion(2)">
           <h1>HOMBRE</h1>
    </div>
       <br>
    `
}

// Funciones de renderizado
function generarRopa() {
    ropa.forEach(function(producto) {
        document.getElementById('ropa').innerHTML+=
        ` 
        <div class="card" style="width: 10rem;">
            <img src="${producto.imagen}" class="card-img-top" >
            <div class="card-body">
                <h6 class="card-title">${producto.nombre}</h6>
                <p class="card-text">${producto.precio} HNL</p>
                <button type="button" class="btn btn-primary btn-comprar" data-bs-toggle="modal" data-bs-target="#modalComprar${producto.id}">
                    comprar
                </button>
            </div>
        </div>
        `
        modalComprar(producto);
    });  
}
generarRopa();

function generarZapatos() {
    zapatos.forEach(function(producto) {
    document.getElementById('zapatos').innerHTML+=
    ` 
    <div class="card" style="width: 10rem;">
    <img src="${producto.imagen}" class="card-img-top" >
    <div class="card-body">
      <h6 class="card-title">${producto.nombre}</h6>
      <p class="card-text">${producto.precio} HNL</p>
      
    </div>
    </div
    `
    });  
}
generarZapatos();

function generarAccesorios() {
    accesorios.forEach(function(producto) {
    document.getElementById('accesorios').innerHTML+=
    ` 
    <div class="card" style="width: 10rem;">
    <img src="${producto.imagen}" class="card-img-top" >
    <div class="card-body">
      <h6 class="card-title">${producto.nombre}</h6>
      <p class="card-text">${producto.precio} HNL</p>
      
    </div>
    </div
    `
    });  
}
generarAccesorios();

//Ventana modal del boton "comprar"
function modalComprar(producto) {
    document.getElementById('ropa').innerHTML+=
    `
    <div class="modal fade" id="modalComprar${producto.id}" tabindex="-1" aria-labelledby="modalComprarLabel${producto.id}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalComprarLabel${producto.id}">${producto.nombre}</h1>
                </div>
                <div class="modal-body">
                <select id="talla-${producto.id}" class="form-select" aria-label="Default select example">
                    <option selected>Seleccionar talla</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btns-modal" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary btns-modal"  onclick="agregarAlCarrito(${producto.id})"  data-bs-dismiss="modal">Agregar al carrito</button>
                </div>
            </div>
        </div>
    </div>
    `
}

function agregarAlCarrito(id){
    let producto = ropa.find(p => p.id === id);
    let talla = document.getElementById(`talla-${id}`).value;
    let item ={
        producto: producto,
        talla: talla
    };
    carrito.push(item);
    actualizarCarrito();
}

function actualizarCarrito(){
    let modalCarrito = document.getElementById('modalBody');
    modalCarrito.innerHTML = '';
    carrito.forEach(item => {
        modalCarrito.innerHTML += 
        `
        <p>${item.producto.nombre} - Talla ${item.talla}</p>
        <b style="text-aling: right">${item.producto.precio} HNL</b>
        <hr>
        `
        if (carrito.length > 1) {
            document.getElementById('finalizar-compra').classList.remove('d-none');
          } else {
            document.getElementById('finalizar-compra').classList.add('d-none');
          }
    });
}

//Ventanas modales 
function modalCarrito() {
    document.getElementById('btnCarrito').innerHTML+=
    `
    <div class="modal fade" id="modalCarrito" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Tu carrito</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalBody">
      </div>
      <div class="modal-footer">
        <button type="button" id="finalizar-compra" class="btn btn-primary  btns-modal">Finalizar compra</button>
      </div>
    </div>
  </div>
</div>
    `
}
modalCarrito();

function modalCliente() {
    document.getElementById('btnUsuario').innerHTML=
    `
    <div class="modal fade" id="modalCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fas fa-user"></i></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modalBody">
      ${clienteActual.nombre} ${clienteActual.apellido}
    ${clienteActual.correo}
      </div>
      <div class="modal-footer">
        <button type="button"  class="btn btn-primary  btns-modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
    `
}
modalCliente();
