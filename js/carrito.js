const contenedor = document.getElementById("carrito");
const total = document.getElementById("total");
const btnConfirmar = document.getElementById("confirmar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() {
  contenedor.innerHTML = "";
  let totalPrecio = 0;

  carrito.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <input type="number" min="1" value="${producto.cantidad}" data-index="${index}" class="input-cantidad">
      <p>Precio unitario: $${producto.precio}</p>
      <p>Subtotal: $${producto.precio * producto.cantidad}</p>
      <button class="eliminar" data-index="${index}">🗑️ Eliminar</button>
    `;
    contenedor.appendChild(card);

    totalPrecio += producto.precio * producto.cantidad;
  });

  total.textContent = `Total a pagar: $${totalPrecio}`;
}

contenedor.addEventListener("click", e => {
  if (e.target.classList.contains("eliminar")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }
});

contenedor.addEventListener("input", e => {
  if (e.target.classList.contains("input-cantidad")) {
    const index = e.target.dataset.index;
    const nuevaCantidad = parseInt(e.target.value);
    if (nuevaCantidad > 0) {
      carrito[index].cantidad = nuevaCantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }
  }
});

btnConfirmar.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
    icon: "error",
    title: "Error",
    text: "Tu carrito esta vacio",
    });
    return;
  }

  alert("¡Compra confirmada! 🎉 Gracias por tu pedido.");
  localStorage.removeItem("carrito");
  carrito = [];
  renderCarrito();
});

renderCarrito();