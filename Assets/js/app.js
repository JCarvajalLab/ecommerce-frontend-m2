// aplicar tema oscuro
const temaOscuro = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'dark');
    document.querySelector('#dl-icon').setAttribute('class', 'bi bi-sun-fill');
    localStorage.setItem('tema', 'dark');
}

// aplicar tema claro
const temaClaro = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'light');
    document.querySelector('#dl-icon').setAttribute('class', 'bi bi-moon-fill');
    localStorage.setItem('tema', 'light');
}

// cambiar tema
const cambiarTema = () => {
    document.querySelector('body').getAttribute('data-bs-theme') === 'light'
        ? temaOscuro()
        : temaClaro();
}

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
        .then(res => res.text())
        .then(data => {
            document.querySelector(elemento).innerHTML = data
        })
}

cargarComponente("/assets/components/navbar.html", "#navbar")
cargarComponente("/assets/components/footer.html", "#footer")

// carrusel

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.getElementById("productCarousel");
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