document.querySelector('#crearTipo').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página   

    try {
        const tipo = document.getElementById('tipo').value

        if (!tipo) {
            alert('Escriba el tipo de animal')
            return;
        }

        const respuesta = await fetch('/api/tipos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo })
        })

        if (!respuesta.ok) {
            const d = await respuesta.json()
            console.error(d.message)
            return
        }

        alert('Tipo de animal creado')
    }

    catch (error) {
        console.log(error);
    }   

})                   