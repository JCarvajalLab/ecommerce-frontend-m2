// Obtener carrito desde localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find((p) => p.id === idProducto);

    const productoEnCarrito = carrito.find((p) => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1,
        });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    mostrarModal(producto);
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const contador = document.querySelector("#contador-carrito");

    if (!contador) return;

    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    contador.textContent = total;
}

//Eventos Modal
function mostrarModal(producto) {
    const mensaje = document.getElementById("mensaje-modal");

    if (mensaje) {
        mensaje.innerHTML = `
        <strong>${producto.nombre}</strong><br>
        Precio: $${producto.precio.toLocaleString("es-CL")}<br>
        agregado al carrito 🛒
        `;
    }

    const modal = new bootstrap.Modal(document.getElementById("modalCarrito"));

    modal.show();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");

    if (!contador) return;

    const total = carrito.reduce((acc, producto) => {
        return acc + producto.cantidad;
    }, 0);

    contador.textContent = total;
}

function cargarCarrito() {

    const contenedor = document.getElementById("contenedor-carrito");
    if (!contenedor) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "";

    carrito.forEach((producto, index) => {

        const item = document.createElement("div");

        item.classList.add("product-card", "p-3", "shadow-sm", "mb-3");

        item.innerHTML = `
            <div class="row align-items-center">

                <div class="col-md-2">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image"/>
                </div>

                <div class="col-md-4">
                    <h6 class="mb-1">${producto.nombre}</h6>
                    <p class="text-muted mb-0">${producto.descripcion || ""}</p>
                </div>

                <div class="col-md-3">
                    <div class="d-flex align-items-center gap-2">

                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">
                            -
                        </button>

                        <input 
                            type="number" 
                            class="quantity-input" 
                            value="${producto.cantidad}" 
                            min="1"
                        />

                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">
                            +
                        </button>

                    </div>
                </div>

                <div class="col-md-2">
                    <span class="fw-bold">$${producto.precio * producto.cantidad}</span>
                </div>

                <div class="col-md-1">
                    <i class="bi bi-trash remove-btn" onclick="eliminarProducto(${index})"></i>
                </div>

            </div>
        `;

        contenedor.appendChild(item);

    });

}

document.addEventListener("DOMContentLoaded", () => {

    actualizarContadorCarrito();
    cargarCarrito();

});
