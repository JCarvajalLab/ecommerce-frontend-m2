// aplicar tema oscuro
const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    localStorage.setItem("tema", "dark");

    // El ícono puede no existir aún si el navbar no cargó
    const icon = document.querySelector("#dl-icon");
    if (icon) icon.setAttribute("class", "bi bi-sun-fill");
};

// aplicar tema claro
const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    localStorage.setItem("tema", "light");

    const icon = document.querySelector("#dl-icon");
    if (icon) icon.setAttribute("class", "bi bi-moon-fill");
};

// cambiar tema
const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light"
        ? temaOscuro()
        : temaClaro();
};

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "dark") {
        temaOscuro();
    } else {
        temaClaro();
    }
});

// JS para cargar los componentes que se repiten como el navbar y el footer

// detectar si estamos dentro de /pages
const baseRuta = window.location.pathname.includes("/pages/") ? "../" : "";

const cargarComponente = (ruta, elemento) => {
    fetch(baseRuta + ruta)
        .then(res => res.text())
        .then(data => {
            document.querySelector(elemento).innerHTML = data;

            if (elemento === "#navbar") {
                marcarLinkActivo();
                actualizarContadorCarrito();
            }
        });
};

cargarComponente("assets/components/navbar.html", "#navbar");
cargarComponente("assets/components/footer.html", "#footer");

//Marcar un componente como activo

const marcarLinkActivo = () => {
    const links = document.querySelectorAll(".nav-link");

    const rutaActual = window.location.pathname;

    links.forEach((link) => {
        if (link.getAttribute("href") === rutaActual) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    marcarLinkActivo();
});

// ────────────────────────────────────────────
//  Carrusel — solo existe en index.html
// ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("pDestacados");
    const btnRight = document.querySelector(".carousel-btn-right");
    const btnLeft  = document.querySelector(".carousel-btn-left");

    // Verificar que existen antes de agregar eventos
    if (carousel && btnRight && btnLeft) {
        btnRight.addEventListener("click", () => {
            carousel.appendChild(carousel.firstElementChild);
        });

        btnLeft.addEventListener("click", () => {
            carousel.prepend(carousel.lastElementChild);
        });
    }
});

// ────────────────────────────────────────────
//  Productos cargados en productos.html
// ────────────────────────────────────────────
const contenedor = document.getElementById("contenedor-productos");

if (contenedor) {
    productos.forEach((producto) => {
        contenedor.innerHTML += `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">$${producto.precio.toLocaleString("es-CL")}</span>
                        <div>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-half text-warning"></i>
                            <small class="text-muted">(4.5)</small>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" onclick="agregarAlCarrito(${producto.id})">
                        Agregar al carrito
                    </button>
                    <a href="pages/descripcion.html?id=${producto.id}" class="btn btn-outline-secondary btn-sm">
                        Ver más
                    </a>
                </div>
            </div>
        </div>
        `;
    });
}

// ────────────────────────────────────────────
//  Productos destacados cargados en index.html
// ────────────────────────────────────────────
const contenedorDestacados = document.getElementById("pDestacados");

if (contenedorDestacados) {
    const productosDestacados = productos.filter(producto => producto.destacado);

    productosDestacados.forEach(producto => {
        contenedorDestacados.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4">
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">$${producto.precio.toLocaleString("es-CL")}</span>
                        <div>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-success btn-sm" onclick="agregarAlCarrito(${producto.id})">
                        Agregar al carrito
                    </button>
                    <a href="/pages/descripcion.html?id=${producto.id}" class="btn btn-outline-secondary btn-sm">
                        Ver más
                    </a>
                </div>
            </div>
        </div>
        `;
    });
}

// ────────────────────────────────────────────
//  Descripción del producto - descripcion.html
// ────────────────────────────────────────────
const seccionDescripcion = document.getElementById("detalle-producto");

if (seccionDescripcion) {
    const params = new URLSearchParams(window.location.search);
    const idProducto = parseInt(params.get("id"));
    const producto = productos.find((p) => p.id === idProducto);

    if (!producto) {
        seccionDescripcion.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-exclamation-circle" style="font-size: 3rem; opacity: .4;"></i>
                <p class="mt-3 text-muted">Producto no encontrado.</p>
                <a href="/pages/productos.html" class="btn btn-primary mt-2">Ver productos</a>
            </div>
        `;
    } else {
        seccionDescripcion.innerHTML = `
            <div class="row">

                <!-- Imagen del producto -->
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <img 
                            src="${producto.imagen || 'https://via.placeholder.com/600x400?text=Sin+imagen'}" 
                            class="card-img" 
                            alt="${producto.nombre}"
                        />
                    </div>
                </div>

                <!-- Detalle del producto -->
                <div class="col-md-6">

                    <h1 class="h2 mb-3">${producto.nombre}</h1>

                    <!-- Precio -->
                    <div class="mb-3">
                        <span class="h4 me-2">$${producto.precio.toLocaleString("es-CL")}</span>
                    </div>

                    <!-- Reviews (estáticas) -->
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <div class="text-warning me-2">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-half"></i>
                            </div>
                            <span class="text-muted">(128 reseñas)</span>
                        </div>
                    </div>

                    <!-- Descripción -->
                    <p class="mb-4">${producto.descripcion}</p>

                    <!-- Color (visual, sin funcionalidad) -->
                    <div class="mb-4">
                        <h6 class="mb-2">Color</h6>
                        <div class="btn-group" role="group">
                            <input type="radio" class="btn-check" name="color" id="color-1" checked>
                            <label class="btn btn-outline-secondary" for="color-1">Negro</label>
                            <input type="radio" class="btn-check" name="color" id="color-2">
                            <label class="btn btn-outline-secondary" for="color-2">Blanco</label>
                            <input type="radio" class="btn-check" name="color" id="color-3">
                            <label class="btn btn-outline-secondary" for="color-3">Gris</label>
                        </div>
                    </div>

                    <!-- Cantidad -->
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2">
                            <label class="mb-0">Cantidad:</label>
                            <select class="form-select w-auto" id="cantidad-descripcion">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="d-grid gap-2">
                        <button class="btn btn-success" onclick="agregarDesdeDescripcion(${producto.id})">
                            <i class="bi bi-cart-plus me-2"></i>Agregar al carrito
                        </button>
                        <a href="/pages/productos.html" class="btn btn-outline-secondary">
                            <i class="bi bi-arrow-left me-2"></i>Volver a productos
                        </a>
                    </div>

                </div>
            </div>
        `;
    }
}

// Agregar al carrito respetando la cantidad seleccionada en descripcion.html
function agregarDesdeDescripcion(idProducto) {
    const selectCantidad = document.getElementById("cantidad-descripcion");
    const cantidad = selectCantidad ? parseInt(selectCantidad.value) : 1;

    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(idProducto);
    }
}

// ────────────────────────────────────────────
//  Formulario contacto — solo existe en contactos.html
// ────────────────────────────────────────────
const formularioContacto = document.getElementById("formulario-contacto");

if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (e) {
        e.preventDefault();
        new bootstrap.Modal(document.getElementById("modalContacto")).show();
        this.reset();
    });
}