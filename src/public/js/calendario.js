document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar');
    const reservaModal = document.getElementById('reservaModal');
    const guardarReservaBtn = document.getElementById('guardarReserva');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    let selectedInfo = null;
    const modal = document.getElementById('reservaModal'); // Asegura que está definido

    // Cargar eventos desde la API
    const fetchReservas = async () => {
        const res = await fetch('/api/reservas/reservas');
        return await res.json();
    };

    
 
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        // Abrir modal al seleccionar una fecha
        select: function (info) {
            selectedInfo = info; // Guardamos la info de la selección
            reservaModal.style.display = 'block';
            modal.style.opacity = '1'; // Forzar que sea visible
            modal.style.pointerEvents = 'auto'; // Habilitar interacciones
            modal.style.zIndex = '1050'; 
        },
        // Eliminar una reserva
        eventClick: async function (info) {
            if (confirm(`¿Eliminar la reserva "${info.event.title}"?`)) {
                const res = await fetch(`/api/reservas/${info.event.id}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    info.event.remove();
                } else {
                    alert("Error al eliminar la reserva.");
                }
            }
        }
    });
    const storedEvents = await fetchReservas();
    storedEvents.reservas.forEach(startStr => {
      calendar.addEvent({
          title: `Reserva: ${startStr._id}`,  // Usar el título que prefieras
          start: startStr.fecha_desde,  // Usar fecha_desde
          end: startStr.fecha_hasta,    // Usar fecha_hasta
          allDay: true,  // Asumimos que es un evento de todo el día
      })
    })
    calendar.render();

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
            body: JSON.stringify({newEvent})
        });

        const savedEvent = await res.json();
        calendar.addEvent(savedEvent);
        reservaModal.style.display = 'none';
        location.reload()
    });

    // Cerrar modal
    cerrarModalBtn.addEventListener('click', function () {
        reservaModal.style.display = 'none';
    });

    
});
document.getElementById('reservaModal').addEventListener('click', (e) => {
    e.stopPropagation();
});
