// Se agrega de forma adicional el metodo cambiar color de pantalla 
const temaOscuro = () =>{
document.querySelector('body').setAttribute('data-bs-theme', 'dark'); // Cambiar a dark
document.querySelector('#dl-icon').setAttribute('class', 'bi bi-sun-fill'); // cambiar icono
}

const temaClaro = () =>{
document.querySelector('body').setAttribute('data-bs-theme', 'light'); // Cambiar a claro
document.querySelector('#dl-icon').setAttribute('class', 'bi bi-moon-fill'); // cambiar icono
}

const cambiarTema = () => {
    document.querySelector('body').getAttribute('data-bs-theme')=== 'light'?
    temaOscuro() : temaClaro();
}