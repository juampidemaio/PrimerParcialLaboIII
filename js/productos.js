let carrito = [];
let total = 0;

function guardarProductos(productos) {
  let contador = 1;
  for (let producto of productos) {
    localStorage.setItem(`producto${contador}-titulo`, producto["titulo"]);
    localStorage.setItem(`producto${contador}-precio`, producto["precio"]);
    localStorage.setItem(`producto${contador}-cantidad`, producto["cantidad"]);
    contador++;
  }
}

function recuperarProductos() {
  let contador = 1;
  let carritoProductos = [];

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

const botonesAgregarCarrito = document.querySelectorAll(".btnCarrito");

for (let boton of botonesAgregarCarrito) {
  boton.addEventListener("click", () => {
    carrito = recuperarProductos();
    const divTituloHamburguesa = document.querySelector(".titulo");
    const h2PrecioHamburguesa = document.getElementById("precio");

    let tituloHamburguesa = divTituloHamburguesa.innerHTML;
    let precioHamburguesa = parseFloat(
      h2PrecioHamburguesa.innerHTML.replace("$", "")
    );
    let cantidad = 1;

    const nuevoProducto = {
      titulo: tituloHamburguesa,
      precio: precioHamburguesa,
      cantidad: cantidad,
    };

    let agregar = true;
    for (let producto of carrito) {
      if (producto["titulo"] === nuevoProducto["titulo"]) {
        producto["cantidad"]++;
        agregar = false;
      }
    }
    if (agregar) {
      carrito.push(nuevoProducto);
    }
    total += nuevoProducto["precio"];
    console.log(carrito);
    console.log(total);

    guardarProductos(carrito);
    window.location.href = "../Carrito/index.html";
  });
}
