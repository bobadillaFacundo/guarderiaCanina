// Asegúrate de que el DOM esté completamente cargado antes de ejecutar cualquier acción
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar el carrusel de Bootstrap
    var carousel = new bootstrap.Carousel(document.getElementById('carruselAnimales'), {
        interval: 5000,  // Intervalo de 5 segundos entre cada cambio de imagen
        ride: 'carousel' // Iniciar el carrusel automáticamente al cargar la página
    });

    // Si deseas habilitar las acciones adicionales, como el cambio de estado de un animal en la guardería
    // o en adopción, puedes agregar eventos aquí.
    
    // Ejemplo: Cambiar el estado de un animal cuando se hace clic en su tarjeta
    const animalCards = document.querySelectorAll('.card-body');

    animalCards.forEach(card => {
        card.addEventListener('click', function() {
            const nombreAnimal = this.querySelector('.card-title').innerText;
            alert(`Has seleccionado a ${nombreAnimal}`);
            // Aquí puedes agregar lógica adicional para realizar cambios en el estado del animal
        });
    });
});

//recuperar boton evento
document.querySelector(".buttonLoginUsuario").addEventListener("click", async () =>{
    const tipoUsuario = localStorage.getItem('tipoUsuario')
    window.location.href = `/api/login/principal/${tipoUsuario}`
})