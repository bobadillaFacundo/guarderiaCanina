document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar');
    const reservaModal = document.getElementById('reservaModal');
    const guardarReservaBtn = document.getElementById('guardarReserva');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    let selectedInfo = null;
    let modalAbierto = false;

    // Crear el fondo oscuro (overlay)
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9998';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    // Crear el menú de eventos
    const menuEvento = document.createElement('div');
    menuEvento.id = 'menuEvento';
    menuEvento.style.position = 'absolute';
    menuEvento.style.display = 'none';
    menuEvento.style.background = 'white';
    menuEvento.style.border = '1px solid #ccc';
    menuEvento.style.padding = '10px';
    menuEvento.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.2)';
    menuEvento.style.zIndex = '10000';
    menuEvento.style.pointerEvents = 'auto';
    
    // Botón de cerrar el menú
    const cerrarMenuBtn = document.createElement('button');
    cerrarMenuBtn.textContent = 'Cerrar';
    cerrarMenuBtn.style.display = 'block';
    cerrarMenuBtn.style.marginTop = '10px';
    cerrarMenuBtn.onclick = function () {
        cerrarMenu();
    };

    menuEvento.appendChild(cerrarMenuBtn);
    document.body.appendChild(menuEvento);

    // Función para cerrar el menú
    function cerrarMenu() {
        menuEvento.style.display = 'none';
        overlay.style.display = 'none';
        location.reload();

    }

    // Cargar reservas
    const fetchReservas = async () => {
        const id = localStorage.getItem('idUsuario');
        const tipo = localStorage.getItem('tipoUsuario');
        const res = await fetch(`/api/reservas/reservas/${id}/${tipo}/`);
        return await res.json();
    };

    // Inicializar FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: false,
        contentHeight: 500,
        locale: 'es',
        timeZone: 'UTC',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
        },
        aspectRatio: 1,
        select: function (info) {
            if (modalAbierto) return;
            selectedInfo = info;
            reservaModal.style.display = 'block';
            modalAbierto = true;
            calendar.unselect();
        },
        eventClick: function (info) {
            info.jsEvent.preventDefault();
            info.jsEvent.stopPropagation();

            menuEvento.innerHTML = '';  // Limpia el menú antes de agregar botones nuevos

            // Botón Eliminar
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.onclick = async function () {
                if (confirm(`¿Eliminar la reserva "${info.event.title}"?`)) {
                    const id = info.event.title.match(/\d+[a-zA-Z]+|\d+/g).join('');
                    const res = await fetch(`/api/reservas/${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        info.event.remove();
                        location.reload();
                    } else {
                        alert("Error al eliminar la reserva.");
                    }
                }
            };

            // Botón Detalle
            const detalleBtn = document.createElement('button');
            detalleBtn.textContent = 'Detalle';
            detalleBtn.onclick = function () {
                alert(`Detalles de la reserva: ${info.event.title}&#10;Fecha de inicio: ${info.event.start}&#10;Fecha de fin: ${info.event.end}`);
                location.reload()
            };

            // Botón Pagar
            const pagarBtn = document.createElement('button');
            pagarBtn.textContent = 'Pagar';
            pagarBtn.onclick = function () {
                const tipo = localStorage.getItem('tipoUsuario');
                const reserva = info.event.title.match(/\d+[a-zA-Z]+|\d+/g).join('');
                    window.location.href = `/api/reservas/pagar/${tipo}/${reserva}`;
            };

            // Agregar botones al menú
            menuEvento.appendChild(eliminarBtn);
            menuEvento.appendChild(detalleBtn);
            menuEvento.appendChild(pagarBtn);
            menuEvento.appendChild(cerrarMenuBtn); // Asegurar que el botón cerrar esté

            // Posicionar y mostrar menú
            menuEvento.style.left = `${info.jsEvent.clientX + window.scrollX}px`;
            menuEvento.style.top = `${info.jsEvent.clientY + window.scrollY}px`;
            menuEvento.style.display = 'block';

            // Mostrar overlay
            overlay.style.display = 'block';
        }
    });

    // Cargar eventos
    const storedEvents = await fetchReservas();
    storedEvents.reservas.forEach(reserva => {
        calendar.addEvent({
            title: `Reserva: ${reserva._id}`,
            start: reserva.fecha_desde,
            end: reserva.fecha_hasta,
            allDay: true,
        });
    });

    // Guardar reserva
    guardarReservaBtn.addEventListener('click', async function () {
        if (!selectedInfo) return;
        const idUsuario = localStorage.getItem('idUsuario');
        const alimento = document.getElementById('alimento').value;
        const medicamento = document.getElementById('medicamentos').value;
        const extras = document.getElementById('extras').value;
        const tipoReserva = document.getElementById('tipoReserva').value;
        const newEvent = {
            alimento,
            medicamento,
            extras,
            montoTotal: 100000,
            id_animal: tipoReserva,
            fecha_desde: selectedInfo.startStr,
            fecha_hasta: selectedInfo.endStr,
            id_usuario: idUsuario
        };
        const res = await fetch('/api/reservas/guardarReserva', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newEvent })
        });
        const savedEvent = await res.json();
        calendar.addEvent(savedEvent);
        reservaModal.style.display = 'none';
        modalAbierto = false;
        location.reload();
    });

    // Cerrar modal
    cerrarModalBtn.addEventListener('click', function () {
        reservaModal.style.display = 'none';
        modalAbierto = false;
    });

    // Cerrar menú al hacer clic en el fondo oscuro
    overlay.addEventListener('click', cerrarMenu);

    // Renderizar calendario
    calendar.render();
});
