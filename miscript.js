/*--Funciones para dar funcionalidad al carrito--*/
//mantiene el estado visble del carrito

if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
   //Dar funcionalidad a los botones iliminar del carrito
   var botonesEliminar = document.getElementsByClassName('botonIliminar');
for(var i=0; i < botonesEliminar.length;i++){
    var button = botonesEliminar[i];
    button.addEventListener('click', eliminarItemCarrito);
}
 //agrego funcionalidad al boton sumar 
   var botonSumarCantidad= document.getElementsByClassName('sumarCantidad');
   for(var i=0; i < botonSumarCantidad.length;i++){
    var button =botonSumarCantidad[i];
    button.addEventListener('click', sumarCantidad);
   }

    //agrego funcionalidad al boton restarRestar
    var botonRestarCantidad= document.getElementsByClassName('restarCantidad');
    for(var i=0; i < botonRestarCantidad.length;i++){
     var button =botonRestarCantidad[i];
     button.addEventListener('click', restarCantida);
    }

    //agrego funcionalidad al boton carrito para agregar un producto
    var botonAgregarProd=document.getElementsByClassName('carritoAgregar');
    for(var i=0; i < botonAgregarProd.length;i++){
        var button =botonAgregarProd[i];
        button.addEventListener('click', agregarAlCarrito);
       }

    //agrego funcionalidad para poder pagar
    document.getElementsByClassName('botonPagar')[0].addEventListener('click', pagar);
}


//Eliminar el iten seleccionado del carrito si no se desea agregar.
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
   buttonClicked.parentElement.remove();//Eliminar el elemento del nodo

   // Actualizar el total del carrito cuando se hallan quitados los elementos.
  actualizarTotal(); 
}

//Funcion para actualizar el total del carrito de compras
function  actualizarTotal(){
    //selecciono el contenedor del carrto.
    var contenedorCarrito=document.getElementsByClassName('carrito')[0];
    var itemCarrito = contenedorCarrito.getElementsByClassName('carritoIt');
    var totalCarrito = 0; 

    // uso for para recorrer cada elemento del carrito para actualizar el total
    var i;
    for(i=0; i < itemCarrito.length;i++){
       var item = itemCarrito[i]; 
       var precioProducto = item.getElementsByClassName('carritoItemPrecio')[0];
       console.log(precioProducto);
   //quito el simbolo pesos
       var precio = parseFloat(precioProducto.innerText.replace('$',''));// para tener un valor de respuesta mas preciso
       console.log(precio);
       var cantidadItem = item.getElementsByClassName('carritoCantidad')[0];
       var cantidad = cantidadItem.value;
       console.log(cantidad);
       totalCarrito = totalCarrito + (precio * cantidad);
    }

    totalCarrito = Math.round(totalCarrito * 100)/100;
    document.getElementsByClassName('precioTotal')[0].innerText =totalCarrito;
}

// funcion sumar cantidad de un producto en 1 en 1
function  sumarCantidad(event){
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName('carritoCantidad')[0].value;//retorna coleccion de elementos
  console.log(cantidadActual);
  cantidadActual++;
  selector.getElementsByClassName('carritoCantidad')[0].value=cantidadActual;

  //Actualizamos el total
   actualizarTotal();
}

//Funcion restar cantidad de producto
function restarCantida(event){
    var buttonClicked = event.target ;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carritoCantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    // se controla que no sea menor que 1
   if(cantidadActual>=1){
    selector.getElementsByClassName('carritoCantidad')[0].value=cantidadActual;
    //Actualizamos el total
     actualizarTotal();
   }
}
// Funcion Agregar producto 
function agregarAlCarrito(event){
   var button=event.target;
   var producto = button.parentElement;
   var titulo = producto.getElementsByClassName('tituloProducto')[0].innerText;//obtener el valor del titulo
   console.log(titulo);
   var precio = producto.getElementsByClassName('precioProd')[0].innerText;
   console.log(precio);
   var imagenProducto= producto.getElementsByClassName('imagenProd')[0].src;
   console.log(imagenProducto);

   // Funcion Agregar producto ala carrito pasando por parametros los valores
   agregarProdAlCarrito(titulo,precio,imagenProducto);
}

function agregarProdAlCarrito(titulo,precio,imagenProducto){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //Controlo que el producto no este agregado ya
    var nombresProductos = itemsCarrito.getElementsByClassName('carritoItTitulo');
    for(var i=0; i < nombresProductos.length; i++){
    
        if(nombresProductos[i].innerText==titulo){
           alert("El producto ya se encuentra en el carrito, si desea puede modificar su cantidad");
           return;
    }
}

var itemCarritoContenido=`   
<div class="carritoIt">
<img src="${imagenProducto}" id="imgProd" alt="">
<div class="carritoItDetalles">
    <span class="carritoItTitulo">${titulo}</span>
    <div class="selectorCantidad">
       <img src="imagenes/signoMenos.png" class="restarCantidad" id="icono">
        <input type="text" value="1" class="carritoCantidad">
        <img src="imagenes/incremento.png" class="sumarCantidad" id="icono" >
    </div>
    <span class="carritoItemPrecio">${precio}</span>
</div>
<span class="botonIliminar">
    <img src="imagenes/tarrito.png" id="botIliminar"> 
</span>
</div>
`
item.innerHTML = itemCarritoContenido;
itemsCarrito.append(item);

// funcion para que se pueda eliminar
item.getElementsByClassName('botonIliminar')[0].addEventListener('click', eliminarItemCarrito);

//permitir sumar cantidad en el nuevo poducto
var botsumarCantidad =item.getElementsByClassName('sumarCantidad')[0];
botsumarCantidad.addEventListener('click', sumarCantidad);

//permitir restar cantidad en el nuevo poducto
var botRestarCantidad =item.getElementsByClassName('restarCantidad')[0];
botRestarCantidad.addEventListener('click', restarCantida);

actualizarTotal();
}

// funcion pagar 
function pagar(event){
   alert("Gracias por su compra");
   // elimino todos los item del carrito
   var carritoItems = document.getElementsByClassName('carrito-items')[0];
   while (carritoItems.hasChildNodes()){
    carritoItems.removeChild(carritoItems.firstChild);
    actualizarTotal();
   }
   
}

/*--VALIDAR FORMULARIO PRESUPUESTO--*/

function validar(){
/*expresiones regulares*/
   var expresion1=/^([A-Z]{1}[a-z]+[]*){1,2}$/; //para el nombre
   var expresion2=/\w+@\w*\.+[a-z]/;// para el mail

   let mostarErrores= document.getElementById("mostarErrores");
   mostarErrores.style.color = '#FF0033';
   mostarErrores.style.backgroundColor = '#9d9d9c';
   mostarErrores.style.marginLeft = '5px';
   mostarErrores.style.padding = '5px';
   mostarErrores.style.borderRadius= '10px';

 /*----------------------------------------------------validar nommbre------------------------------------------*/
 var nombre= document.getElementById("nombre");
      if(!expresion1.test(nombre.value)){
         nombre.style.borderColor= "#FF0000"; 
         mostarErrores.insertAdjacentHTML('beforeend','<p>Revise el campo Nombre. Debe empezar con Mayuscula seguida de minusculas</p>')
      } else{
         nombre=true;   
      }
 /*--------------------------------------------------------validar mail--------------------------------------------------*/
      var email= document.getElementById("email");

          if(!expresion2.test(email.value)){
             email.style.borderColor= "#FF0000"; 
             mostarErrores.insertAdjacentHTML('beforeend','<p>Revise la direccion de email</p>');
          } else{ 
             email=true;
          }
  /*-------------------------------------------------validar telefono--------------------------------------------------------*/
      var telefono= document.getElementById("telefono");
      if (isNaN(telefono.value) ||telefono.value =="" ){
        telefono.style.borderColor= "#FF0000";
        mostarErrores.insertAdjacentHTML('beforeend','<p>Ingrese un numero de telefono correcto</p>');
      }else{
        telefono=true;
      }
 /*-------------------------------------------------Descripcion--------------------------------------------------------*/
    var descripcion= document.getElementById("Descripcion");
    if (descripcion.value== ""){
        descripcion.style.borderColor= "#FF0000";
        mostarErrores.insertAdjacentHTML('beforeend','<p>Es requerido que ingrese una descripcion de lo que necesita.</p>');
       
      }else{
        descripcion=true;
      }

      if(nombre== true &&  email== true && telefono== true && descripcion){
        mostarErrores.insertAdjacentHTML('beforeend','<p>Su consulta ha sido enviada.<br>En breve nos contactaremos por los medios proporcionados.</p>');
        mostarErrores.style.color = 'white';
        mostarErrores.style.backgroundColor = '#20c311';
        limpiarFormulario();
     }
}

function limpiarFormulario() {
    var formulario = document.getElementById("formulario");
    
    for (var i = 0; i < formulario.elements.length; i++) {
      formulario.elements[i].value = "";
    }
  }