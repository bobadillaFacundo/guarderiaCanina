document.addEventListener("DOMContentLoaded", function () {
    // Inicializar el carrusel de Bootstrap
    var myCarousel = new bootstrap.Carousel(document.querySelector("#carruselMascotas"), {
        interval: 3000, // Cambia de imagen cada 3 segundos
        wrap: true, // Permite volver al primer elemento después del último
        pause: "hover" // Pausar el carrusel cuando el mouse está encima
    });

});
