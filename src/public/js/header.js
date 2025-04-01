document.addEventListener("DOMContentLoaded", function () {
    // Asignar eventos a los botones correctamente
    document.getElementById("btnAdopciones").addEventListener("click", function () {
        window.location.href = "/api/animales/adopcionAnimal/";
    });
    document.getElementById("btnIniciarSesion").addEventListener("click", function () {
        window.location.href = "/api/login/principal/"
    });

    document.getElementById("btnCrearAnimales").addEventListener("click", function () {
        try {
            window.location.href = "/api/animales/altaAnimal/";
        } catch (error) {
            console.error("Error al redirigir:", error);
        }
    });

    document.getElementById("btnReservar").addEventListener("click", function () {
        try {
            window.location.href = "/api/reservas/calendario";
        } catch (error) {
            console.error("Error al redirigir:", error);
        }
    });

    document.getElementById("btnPaquetes").addEventListener("click", function () {
        console.log("Paquetes clickeado"); // Agrega funcionalidad si es necesario
    });

    document.getElementById("btnAnimales").addEventListener("click", function () {
        window.location.href = "/api/animales/";
    });

    document.getElementById("btnTipos").addEventListener("click", function () {
        window.location.href = "/api/tipos/listado/";
    });

    document.getElementById("btnPerfil").addEventListener("click", function () {
        const idPerfil = localStorage.getItem("idUsuario");
        if (idPerfil) {
            window.location.href = `/api/usuarios/perfil/${idPerfil}/`;
        } else {
            console.warn("No hay ID de usuario en el localStorage.");
        }
    });

    document.getElementById("btnCrearTipos").addEventListener("click", function () {
        window.location.href = "/api/tipos/";
    });

    // Manejo del dropdown
    const dropdownToggle = document.querySelector(".dropbtn");
    const dropdownMenu = document.querySelector(".dropdown-content");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            dropdownMenu.classList.toggle("show");
        });

        // Cerrar dropdown si el usuario hace clic fuera
        document.addEventListener("click", (event) => {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }
});
