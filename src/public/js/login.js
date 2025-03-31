document.querySelector('.buttonCrearUsuario').addEventListener('click', async () => {

    window.location.href = `/api/login/crearUsuario/`

})


document.getElementById('formCAS').addEventListener('submit', async function (event) {
    event.preventDefault()  // Prevenir el envío convencional del formulario

    // Obtener los datos del formulario
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",
            body: JSON.stringify({ username: email, password: password })
        })

        if (!response.ok) {
            const d = await response.json()
            console.error(d.message)
            return
        }

        // Obtener el token de la respuesta
        const { token, idUsuario } = await response.json()

        // Guardar el token en el localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('email', email)
        localStorage.setItem('idUsuario', idUsuario)
        //definir una cookies
        document.cookie = `token=${token}; max-age=3600; path=/; secure ; samesite=none`
        // Redireccionar a la nueva página
        window.location.href = "/api/login/principal/"

    } catch (err) {
        console.log('Error al realizar la solicitud:', err)
    }
})
