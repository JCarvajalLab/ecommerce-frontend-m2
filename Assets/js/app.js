// aplicar tema oscuro
const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
    localStorage.setItem("tema", "dark");
};

// aplicar tema claro
const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
    localStorage.setItem("tema", "light");
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

const cargarComponente = (ruta, elemento) => {
    fetch(ruta)
        .then((res) => res.text())
        .then((data) => {
            document.querySelector(elemento).innerHTML = data;

            if (elemento === "#navbar") {
                marcarLinkActivo();
                actualizarContadorCarrito();
            }
        });
};

cargarComponente("/assets/components/navbar.html", "#navbar");
cargarComponente("/assets/components/footer.html", "#footer");

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

// carrusel

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("pDestacados");
    const btnRight = document.querySelector(".carousel-btn-right");
    const btnLeft = document.querySelector(".carousel-btn-left");

    btnRight.addEventListener("click", () => {
        const firstCard = carousel.firstElementChild;

        carousel.appendChild(firstCard);
    });

    btnLeft.addEventListener("click", () => {
        const lastCard = carousel.lastElementChild;

        carousel.prepend(lastCard);
    });
});

//Productos cargados en productos.html

const contenedor = document.getElementById("contenedor-productos");

if (contenedor) {

productos.forEach((producto) => {

contenedor.innerHTML += `
<div class="col-md-4">
    <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">
            ${producto.descripcion}
            </p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="h5 mb-0">
                $${producto.precio}
                </span>
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
            <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${producto.id})">
            Agregar al carrito
            </button>
        </div>
    </div>
</div>
`;

});

}

// Productos destacados cargados a index.html desde el Arraylist

const contenedorDestacados = document.getElementById("pDestacados")

if (contenedorDestacados) {

const productosDestacados = productos.filter(producto => producto.destacado)

productosDestacados.forEach(producto => {

contenedorDestacados.innerHTML += `
<div class="col-12 col-sm-6 col-md-4">

<div class="card h-100">

<img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">

<div class="card-body">

<h5 class="card-title">${producto.nombre}</h5>

<p class="card-text">
${producto.descripcion}
</p>

<div class="d-flex justify-content-between align-items-center">

<span class="h5 mb-0">
$${producto.precio}
</span>

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

<button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${producto.id})">
Add to Cart
</button>

</div>

</div>

</div>
`

})

}