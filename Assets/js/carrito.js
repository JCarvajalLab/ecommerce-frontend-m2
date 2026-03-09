let carrito = JSON.parse(localStorage.getItem("carrito")) || []

function agregarAlCarrito(producto) {
    carrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}