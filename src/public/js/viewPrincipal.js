
document.getElementById("btnAdopciones").addEventListener("click", function () {
    window.location.href = "/api/animales/adopcionAnimal/"
})
document.getElementById("btnReservar").addEventListener("click", function () {
    try {
        const id = localStorage.getItem('idUsuario')
        window.location.href = `/api/reservas/calendario`
    }catch (error) {
        console.log(error)
    }    
})
document.getElementById("btnPaquetes").addEventListener("click", function () {

})

document.getElementById("btnAnimales").addEventListener("click", function () {
    window.location.href = "/api/animales/"
})

document.getElementById("btnTipos").addEventListener("click", function () {
    window.location.href = "/api/tipos/listado/"
})

document.getElementById("btnPerfil").addEventListener("click", function () {
    const idPerfil = localStorage.getItem('idUsuario')
    window.location.href = `/api/usuarios/perfil/${idPerfil}/`
})