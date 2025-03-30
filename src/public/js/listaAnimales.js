document.querySelector('#buscarNombreAnimal').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    try {
        const nombreAnimal = document.getElementById('nombreDelAnimal').value;

        if (!nombreAnimal) {
            console.log('No se encontró el atributo nombreDelAnimal');
            return;
        }

        // Redirige al backend para obtener los resultados
        window.location.href = `/api/animales/busqueda/${nombreAnimal}`;

    } catch (error) {
        console.log(error);
    }
});