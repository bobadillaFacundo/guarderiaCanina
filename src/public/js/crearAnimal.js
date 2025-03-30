document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("formCrearMascota");

    form.addEventListener("submit",async (event) => {
        event.preventDefault();
        try {
            
        const nombre = document.getElementById("nombre").value
        const adopcion = document.getElementById("adopcion").checked

        if (!nombre) {
            alert("Por favor, ingresa el nombre de la mascota.");
            return;
        }
        const tipo = document.getElementById("tipo").value
        const idUsuario = localStorage.getItem('idUsuario')
        
        const mascota = {
            nombre: nombre,
            idUsuario : idUsuario,
            tipo: tipo,
            adopcion: adopcion
        }

        // Aquí podrías enviar los datos a un servidor con fetch
        const nuevoMascota = await fetch("/api/animales/registrarMascota", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({mascota})
        })  

        if(!nuevoMascota.ok){
            const d = await nuevoMascota.json()
            console.error(d.message)
            return
        }

        alert('Mascota registrada con exito')
        
    }catch (error) {
        console.error(error);
    }   
    })
})
