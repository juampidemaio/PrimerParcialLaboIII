// Obtener el carrito de productos
function recuperarProductos() {
  let contador = 1;
  let carritoProductos = [];

  // mientras que el producto exista en el LS se agrega al carrito
  while (localStorage.getItem(`producto${contador}-titulo`)) {
    let tituloProducto = localStorage.getItem(`producto${contador}-titulo`);
    let precioProducto = localStorage.getItem(`producto${contador}-precio`);
    let cantidadProducto = localStorage.getItem(`producto${contador}-cantidad`);

    const producto = {
      titulo: tituloProducto,
      precio: precioProducto,
      cantidad: cantidadProducto,
    };
    carritoProductos.push(producto);
    contador++;
  }
  return carritoProductos;
}

// Conseguir el path de una imagen a partir de su nombre
function determinarImagenDeHamburguesa(nombreHamburguesa) {
  let nombrePath = nombreHamburguesa.replace(/ /g, "-");
  console.log(nombrePath);
  let path = `../img/${nombrePath}.png`;
  return path;
}

// Calcular el precio total de un producto
function determinarPrecio(producto) {
  return producto["precio"] * producto["cantidad"];
}

function imprimirCarrito() {
  // Mostrar los productos agregados al carrito
  const divCarritoContainer = document.getElementById("carrito-container");

  for (let producto of carrito) {
    const divCarritoContainer = document.getElementById("carrito-container");

    // Creación de todos los productos en el carrito
    const articleCompraUnidad = document.createElement("article");
    articleCompraUnidad.classList.add("compraUnidad");

    const pFotoCarrito = document.createElement("p");
    pFotoCarrito.classList.add("fotoCarrito");

    const imgHamburguesa = document.createElement("img");
    imgHamburguesa.classList.add("fotoHamburguesa");
    imgHamburguesa.src = determinarImagenDeHamburguesa(producto["titulo"]);

    pFotoCarrito.appendChild(imgHamburguesa);

    const pNombreArticulo = document.createElement("p");
    pNombreArticulo.classList.add("nombreArticulo");

    const textoNombreArticulo = document.createTextNode(producto["titulo"]);

    pNombreArticulo.appendChild(textoNombreArticulo);

    const pCantidad = document.createElement("p");
    pCantidad.classList.add("producto-cantidad-carrito");

    const inputCantidad = document.createElement("input");
    inputCantidad.classList.add("contador");
    inputCantidad.type = "number";
    inputCantidad.value = producto["cantidad"];
    inputCantidad.min = "1";
    inputCantidad.max = "10";

    pCantidad.appendChild(inputCantidad);

    const pPrecio = document.createElement("p");
    pPrecio.classList.add("producto-precio-carrito");

    const textoPrecio = document.createTextNode(
      `$${determinarPrecio(producto)}`
    );
    pPrecio.appendChild(textoPrecio);

    const pBorrar = document.createElement("p");
    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("btn-borrar");
    btnBorrar.type = "button";

    const imgTacho = document.createElement("img");
    imgTacho.classList.add("imgTacho");
    imgTacho.src = "../img/eliminar.png";

    btnBorrar.appendChild(imgTacho);
    pBorrar.appendChild(btnBorrar);

    articleCompraUnidad.appendChild(pFotoCarrito);
    articleCompraUnidad.appendChild(pNombreArticulo);
    articleCompraUnidad.appendChild(pCantidad);
    articleCompraUnidad.appendChild(pPrecio);
    articleCompraUnidad.appendChild(pBorrar);

    divCarritoContainer.appendChild(articleCompraUnidad);
  }
}

// Borrar producto
function borrarProducto() {
  const botonesEliminar = document.querySelectorAll(".btn-borrar");

  for (let boton of botonesEliminar) {
    boton.addEventListener("click", () => {
      // Eliminación del elemento en tiempo real
      boton.parentElement.parentElement.remove();

      // Actualización de los datos del carrito en localStorage
      let contador = 1;
      let cambiarNumProductos = false;
      let nombreProducto =
        boton.parentElement.parentElement.children[1].innerHTML;

      while (localStorage.getItem(`producto${contador}-titulo`)) {
        if (
          nombreProducto === localStorage.getItem(`producto${contador}-titulo`)
        ) {
          cambiarNumProductos = true;
        }

        if (cambiarNumProductos) {
          if (localStorage.getItem(`producto${contador + 1}-titulo`)) {
            localStorage.setItem(
              `producto${contador}-titulo`,
              localStorage.getItem(`producto${contador + 1}-titulo`)
            );
            localStorage.setItem(
              `producto${contador}-cantidad`,
              localStorage.getItem(`producto${contador + 1}-cantidad`)
            );
            localStorage.setItem(
              `producto${contador}-precio`,
              localStorage.getItem(`producto${contador + 1}-precio`)
            );
          } else {
            localStorage.removeItem(`producto${contador}-titulo`);
            localStorage.removeItem(`producto${contador}-cantidad`);
            localStorage.removeItem(`producto${contador}-precio`);
            cambiarNumProductos = false;
          }
        }
        contador++;
      }
      calcularCompraFinal();
    });
  }
}

function calcularCompraFinal() {
  carrito = recuperarProductos();
  let subtotal = 0;
  let envio = 0;
  let total;
  for (let producto of carrito) {
    subtotal += determinarPrecio(producto);
    envio += 1000 * producto["cantidad"];
  }
  total = subtotal + envio;

  document.getElementById("precio-subtotal").innerHTML = "";
  document.getElementById("precio-envio").innerHTML = "";
  document.getElementById("precio-total").innerHTML = "";

  const bSubtotal = document.getElementById("precio-subtotal");
  const textoSubtotal = document.createTextNode(`$${subtotal}`);
  bSubtotal.appendChild(textoSubtotal);

  const bEnvio = document.getElementById("precio-envio");
  const textoEnvio = document.createTextNode(`$${envio}`);
  bEnvio.appendChild(textoEnvio);

  const bTotal = document.getElementById("precio-total");
  const textoTotal = document.createTextNode(`$${total}`);
  bTotal.appendChild(textoTotal);
}

// Calcular cambio de cantidad
function actualizarObtenerPrecioTotal(nombre, cantidad) {
  let contador = 1;
  let precioProducto;

  while (localStorage.getItem(`producto${contador}-titulo`)) {
    if (nombre === localStorage.getItem(`producto${contador}-titulo`)) {
      precioProducto = localStorage.getItem(`producto${contador}-precio`);

      localStorage.setItem(`producto${contador}-cantidad`, cantidad);
      break;
    }

    contador++;
  }
  return cantidad * precioProducto;
}

function verificarCambioCantidad() {
  const inputsCantidad = document.querySelectorAll(".contador");

  for (let input of inputsCantidad) {
    input.addEventListener("input", () => {
      let nombreProducto = input.parentElement.previousElementSibling.innerHTML;
      let cantidadProducto = input.value;
      let nuevoPrecio = `$${actualizarObtenerPrecioTotal(
        nombreProducto,
        cantidadProducto
      )}`;
      input.parentElement.nextElementSibling.innerHTML = nuevoPrecio;
      calcularCompraFinal();
    });
  }
}

// Apenas se inicia la aplicación se carga el carrito
let carrito = recuperarProductos();
imprimirCarrito();

// Calculamos el costo final de la compra
calcularCompraFinal();

// Se verifiva si se cambia la cantidad o si se borra un producto
verificarCambioCantidad();
borrarProducto();
