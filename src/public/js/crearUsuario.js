
document.getElementById('formC').addEventListener('submit', async function (event) {
    event.preventDefault()

    const usuario = document.getElementById('Usuario').value
    const password = document.getElementById('ConstraseniaUsuario').value
    const nombre = document.getElementById('nombre').value
        
    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('/api/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: password, nombre: nombre })
        })        

        if (!response.ok) {
            const result = await response.json() 
            console.error(result.message) 
            return 
        }
        const data = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",
            body: JSON.stringify({ username: usuario, password: password })
        })

        if (!data.ok) {
            const d = await data.json()
            console.error(d.message)
            return
        }

        // Obtener el token de la respuesta
        const { token } = await data.json()

        // Guardar el token en el localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('email', usuario)

        //definir una cookies
        document.cookie = `token=${token}; max-age=3600; path=/; secure ; samesite=none`
        // Redireccionar a la nueva página
        window.location.href = `/api/login/principal/`

    } catch (err) {
        console.log('Error al realizar la solicitud:', err)
    }
})
document.querySelector('.buttonLoginUsuario').addEventListener('click', async () => {
  
    window.location.href = `/api/login/`  
})