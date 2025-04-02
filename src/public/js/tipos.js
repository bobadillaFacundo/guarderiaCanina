document.getElementById("btnCrearTipos").addEventListener("click", function () {
    const tipoUsuario = localStorage.getItem('tipoUsuario')
    window.location.href = `/api/tipos/${tipoUsuario}/`
});

document.getElementById("btnTipos").addEventListener("click", function () {
    const tipoUsuario = localStorage.getItem('tipoUsuario')
    window.location.href = `/api/tipos/listado/${tipoUsuario}/`
});
