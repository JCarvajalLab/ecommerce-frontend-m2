// ── Obtener carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ── Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ────────────────────────────────────────────
//  AGREGAR PRODUCTO AL CARRITO
// ────────────────────────────────────────────
function agregarAlCarrito(idProducto) {
    const producto = productos.find((p) => p.id === idProducto);
    if (!producto) return;

    const productoEnCarrito = carrito.find((p) => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    mostrarModal(producto);
}

// ────────────────────────────────────────────
//  ELIMINAR UN PRODUCTO DEL CARRITO
// ────────────────────────────────────────────
function eliminarProducto(id) {
    carrito = carrito.filter((p) => p.id !== id);
    guardarCarrito();
    cargarCarrito();
    actualizarContadorCarrito();
}

// ────────────────────────────────────────────
//  VACIAR TODO EL CARRITO
// ────────────────────────────────────────────
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    cargarCarrito();
    actualizarContadorCarrito();
}

// ────────────────────────────────────────────
//  ACTUALIZAR CANTIDAD (botones + / -)
// ────────────────────────────────────────────
function actualizarCantidad(id, delta) {
    const producto = carrito.find((p) => p.id === id);
    if (!producto) return;

    producto.cantidad += delta;

    if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    guardarCarrito();
    cargarCarrito();
    actualizarContadorCarrito();
}
// ────────────────────────────────────────────
//  CAMBIAR CANTIDAD DIRECTAMENTE DESDE EL INPUT
// ────────────────────────────────────────────
function cambiarCantidadInput(id, valor) {
    const cantidad = parseInt(valor);
    const producto = carrito.find((p) => p.id === id);
    if (!producto) return;

    if (isNaN(cantidad) || cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    producto.cantidad = cantidad;
    guardarCarrito();
    actualizarResumen();
    actualizarContadorCarrito();
}

// ────────────────────────────────────────────
//  ACTUALIZAR CONTADOR DEL NAVBAR
// ────────────────────────────────────────────
function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = total;
}

// ────────────────────────────────────────────
//  CALCULAR Y MOSTRAR EL RESUMEN DEL PEDIDO
// ────────────────────────────────────────────
function actualizarResumen() {
    const subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const elSubtotal = document.getElementById("subtotal");
    const elTotal    = document.getElementById("total");
    const elCantidad = document.getElementById("cantidad-productos");

    if (elSubtotal) elSubtotal.textContent = `$${subtotal.toLocaleString("es-CL")}`;
    if (elTotal)    elTotal.textContent    = `$${subtotal.toLocaleString("es-CL")}`;
    if (elCantidad) {
        const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
        elCantidad.textContent = totalItems;
    }
}


// ────────────────────────────────────────────
//  RENDERIZAR PRODUCTOS EN LA PÁGINA CARRITO
// ────────────────────────────────────────────
function cargarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    if (!contenedor) return;

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x" style="font-size: 3rem; opacity: .4;"></i>
                <p class="mt-3 text-muted">Tu carrito está vacío.</p>
                <a href="../pages/productos.html" class="btn btn-success mt-2">Ver productos</a>
            </div>
        `;
        actualizarResumen();
        return;
    }

    carrito.forEach((producto) => {
        const item = document.createElement("div");
        item.classList.add("product-card", "p-3", "shadow-sm", "mb-3");

        item.innerHTML = `
            <div class="row align-items-center">

                <div class="col-md-2 col-4 mb-2 mb-md-0">
                    <img 
                        src="${producto.imagen || 'https://via.placeholder.com/80x80?text=Sin+imagen'}" 
                        alt="${producto.nombre}" 
                        class="product-image img-fluid rounded"
                    />
                </div>

                <div class="col-md-4 col-8 mb-2 mb-md-0">
                    <h6 class="mb-1">${producto.nombre}</h6>
                    <p class="text-muted mb-0 small">${producto.descripcion || ""}</p>
                    <span class="text-muted small">Precio unitario: $${producto.precio.toLocaleString("es-CL")}</span>
                </div>

                <div class="col-md-3 col-6 mb-2 mb-md-0">
                    <div class="d-flex align-items-center gap-2">
                        <button 
                            class="quantity-btn" 
                            onclick="actualizarCantidad(${producto.id}, -1)"
                            title="Disminuir cantidad"
                        >−</button>
                        <input 
                            type="number" 
                            class="quantity-input" 
                            value="${producto.cantidad}" 
                            min="1"
                            onchange="cambiarCantidadInput(${producto.id}, this.value)"
                        />
                        <button 
                            class="quantity-btn" 
                            onclick="actualizarCantidad(${producto.id}, 1)"
                            title="Aumentar cantidad"
                        >+</button>
                    </div>
                </div>

                <div class="col-md-2 col-4 mb-2 mb-md-0">
                    <span class="fw-bold">
                        $${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
                    </span>
                </div>

                <div class="col-md-1 col-2 text-end">
                    <button 
                        class="btn btn-link p-0 text-danger remove-btn" 
                        onclick="eliminarProducto(${producto.id})"
                        title="Eliminar producto"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

            </div>
        `;

        contenedor.appendChild(item);
    });

    const btnVaciar = document.createElement("div");
    btnVaciar.classList.add("d-flex", "justify-content-end", "mt-2");
    btnVaciar.innerHTML = `
        <button class="btn btn-outline-danger btn-sm" onclick="confirmarVaciarCarrito()">
            <i class="bi bi-trash3 me-1"></i> Vaciar carrito
        </button>
    `;
    contenedor.appendChild(btnVaciar);

    actualizarResumen();
}

// ────────────────────────────────────────────
//  CONFIRMACIÓN ANTES DE VACIAR
// ────────────────────────────────────────────
function confirmarVaciarCarrito() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        vaciarCarrito();
    }
}

// ────────────────────────────────────────────
//  MODAL: mostrar producto agregado
// ────────────────────────────────────────────
function mostrarModal(producto) {
    const mensaje = document.getElementById("mensaje-modal");

    if (mensaje) {
        mensaje.innerHTML = `
            <strong>${producto.nombre}</strong><br>
            Precio: $${producto.precio.toLocaleString("es-CL")}<br>
            agregado al carrito 🛒
        `;
    }

    const modalEl = document.getElementById("modalCarrito");
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}

// ────────────────────────────────────────────
//  PROCESAR PAGO
// ────────────────────────────────────────────
function procesarPago() {

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const confirmar = confirm(
        `El total de tu compra es $${total.toLocaleString("es-CL")}.\n\n¿Deseas proceder con el pago?`
    );

    if (!confirmar) return;

    alert(`Compra realizada con éxito 🎉\n\nTotal pagado: $${total.toLocaleString("es-CL")}`);

    // usar tu función existente
    vaciarCarrito();
}


// ────────────────────────────────────────────
//  INICIALIZACIÓN AL CARGAR EL DOM
// ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    cargarCarrito();
    
    const botonPagar = document.getElementById("btn-pagar");
    if (botonPagar) {
        botonPagar.addEventListener("click", procesarPago);
    }
});