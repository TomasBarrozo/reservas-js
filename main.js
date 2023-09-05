const botonReservar = document.getElementById('reservar');
const listaReservas = document.getElementById('listaReservas');
const nombreInput = document.getElementById('nombre');
const fechaInput = document.getElementById('fecha');
const habitacionSelect = document.getElementById('habitacion');
const mensajeError = document.getElementById('mensajeError'); // Referencia al elemento de mensaje de error

// Función para validar el nombre (solo caracteres alfabéticos)
function esNombreValido(nombre) {
    return /^[a-zA-Z]+$/.test(nombre);
}

// Manejar el evento de reserva
botonReservar.addEventListener('click', function() {
    const nombre = nombreInput.value;
    const fecha = fechaInput.value;
    const habitacion = habitacionSelect.value;

    if (nombre && fecha && esNombreValido(nombre)) {
        const reserva = { nombre, fecha, habitacion };

        // Obtener las reservas actuales o crear un array vacío si no hay ninguna
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);

        localStorage.setItem('reservas', JSON.stringify(reservas));

        mostrarReservas();
        mensajeError.textContent = ''; // Limpiar mensaje de error
    } else if (!nombre) {
        mensajeError.textContent = 'Por favor, complete el campo Nombre.';
    } else if (!esNombreValido(nombre)) {
        mensajeError.textContent = 'El nombre debe contener solo caracteres alfabéticos.';
    } else {
        mensajeError.textContent = 'Por favor, complete todos los campos.';
    }
});

// Función para mostrar todas las reservas
function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    let html = '';

    reservas.forEach((reserva, index) => {
        html += `<li>${reserva.nombre} - ${reserva.fecha} - Habitación ${reserva.habitacion} <button data-index="${index}" class="eliminar">Eliminar</button></li>`;
    });

    listaReservas.innerHTML = html;

    // Manejar el evento de eliminar reserva
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
