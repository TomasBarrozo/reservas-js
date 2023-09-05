const botonReservar = document.getElementById('reservar');
const listaReservas = document.getElementById('listaReservas');
const nombreInput = document.getElementById('nombre');
const fechaInput = document.getElementById('fecha');

// Reservas
botonReservar.addEventListener('click', function() {
    const nombre = nombreInput.value;
    const fecha = fechaInput.value;

    if (nombre && fecha) {
        const reserva = { nombre, fecha };

        // Obtener las reservas o crear un array vacío si no hay ninguna
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);

        localStorage.setItem('reservas', JSON.stringify(reservas));

        mostrarReservas();
    }
});

// Mostrar reservas
function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    let html = '';

    reservas.forEach((reserva, index) => {
        html += `<li>${reserva.nombre} - ${reserva.fecha} <button data-index="${index}" class="eliminar">Eliminar</button></li>`;
    });

    listaReservas.innerHTML = html;

    // Proceso de eliminacion de reservas.
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.splice(index, 1);
            localStorage.setItem('reservas', JSON.stringify(reservas));
            mostrarReservas();
        });
    });
}

// Mostrar las reservas al cargar la página
mostrarReservas();
