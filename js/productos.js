const contenedor = document.getElementById("contenedor-productos");

fetch("../db/products.json") 
  .then(res => res.json())
  .then(data => {
    const productos = data.productos;
    const contenedor = document.getElementById("contenedor-productos");

    productos.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span>$${producto.precio.toLocaleString('es-AR')}</span>
        <button class="boton" data-id="${producto.id}">Comprar</button>
      `;
      contenedor.appendChild(card);
    });

    contenedor.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.getAttribute("data-id"));
        const producto = productos.find(p => p.id === id);
        agregarAlCarrito(producto);
      }
    });

  })
  .catch(error => console.error("Error cargando productos:", error));

  
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const existe = carrito.find(p => p.id === producto.id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));

  Toastify({
    text: "Agregado Exitosamente",
    className: "info",
    style: {
        background: "linear-gradient(to right, #2d9703ff, #96c93d)",
        }
    }).showToast();

}