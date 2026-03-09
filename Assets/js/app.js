// Se agrega de forma adicional el metodo cambiar color de pantalla 
const temaOscuro = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'dark'); // Cambiar a dark
    document.querySelector('#dl-icon').setAttribute('class', 'bi bi-sun-fill'); // cambiar icono
}

const temaClaro = () => {
    document.querySelector('body').setAttribute('data-bs-theme', 'light'); // Cambiar a claro
    document.querySelector('#dl-icon').setAttribute('class', 'bi bi-moon-fill'); // cambiar icono
}

const cambiarTema = () => {
    document.querySelector('body').getAttribute('data-bs-theme') === 'light' ?
        temaOscuro() : temaClaro();
}

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