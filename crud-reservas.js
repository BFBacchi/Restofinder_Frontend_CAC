class Reserva {

    constructor(id, mail, telefono, fechaReserva, nombre, numeroPersonas, horaReserva, restaurante) {
        this.id = id;
        this.mail = mail;
        this.telefono = telefono;
        this.fechaReserva = fechaReserva;
        this.nombre = nombre;
        this.numeroPersonas = numeroPersonas;
        this.horaReserva = horaReserva;
        this.restaurante = restaurante;
    }
}

function showReservas() {
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const tbodyReservas = document.querySelector('#list-table-reservas tbody');
    tbodyReservas.innerHTML = '';
    reservas.forEach(reserva => {
        const tr = `
            <tr>
                <td>${reserva.mail}</td>
                <td>${reserva.telefono}</td>
                <td>${reserva.fechaReserva}</td>
                <td>${reserva.nombre}</td>
                <td>${reserva.numeroPersonas}</td>
                <td>${reserva.horaReserva}</td>
                <td>${reserva.restaurante}</td>
                <td>
                    <button class="btn-cac" onclick='updateReserva(${reserva.id})'><i class="fa fa-pencil"></i></button>
                    <button class="btn-cac" onclick='deleteReserva(${reserva.id})'><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
        tbodyReservas.insertAdjacentHTML('beforeend', tr);
    });
}

function saveReserva() {
    const form = document.querySelector('#form-reserva');

    const inputId = document.querySelector('#id-reserva');
    const inputMail = document.querySelector('#mail');
    const inputTelefono = document.querySelector('#telefono');
    const inputFechaReserva = document.querySelector('#fecha-reserva');
    const inputNombre = document.querySelector('#nombre');
    const inputNumeroPersonas = document.querySelector('#numero-personas');
    const inputHoraReserva = document.querySelector('#hora-reserva');
    const inputRestaurante = document.querySelector('#restaurante');

    if (inputMail.value.trim() !== '') {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

        if (inputId.value !== "") {
            const reservaFind = reservas.find(reserva => reserva.id == inputId.value);
            if (reservaFind) {
                reservaFind.mail = inputMail.value;
                reservaFind.telefono = inputTelefono.value;
                reservaFind.fechaReserva = inputFechaReserva.value;
                reservaFind.nombre = inputNombre.value;
                reservaFind.numeroPersonas = inputNumeroPersonas.value;
                reservaFind.horaReserva = inputHoraReserva.value;
                reservaFind.restaurante = inputRestaurante.value;
            }
        } else {
            let newReserva = new Reserva(
                reservas.length + 1,
                inputMail.value,
                inputTelefono.value,
                inputFechaReserva.value,
                inputNombre.value,
                inputNumeroPersonas.value,
                inputHoraReserva.value,
                inputRestaurante.value,
            );
            reservas.push(newReserva);
        }

        localStorage.setItem('reservas', JSON.stringify(reservas));
        showReservas();
        form.reset();
        Swal.fire({
            title: 'Éxito!',
            text: 'Operación exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Correo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

function updateReserva(reservaId) {
    let reservas = JSON.parse(localStorage.getItem('reservas'));
    let reservaToUpdate = reservas.find(reserva => reserva.id === reservaId);
    if (reservaToUpdate) {
        const inputId = document.querySelector('#id-reserva');
        const inputMail = document.querySelector('#mail');
        const inputTelefono = document.querySelector('#telefono');
        const inputFechaReserva = document.querySelector('#fecha-reserva');
        const inputNombre = document.querySelector('#nombre');
        const inputNumeroPersonas = document.querySelector('#numero-personas');
        const inputHoraReserva = document.querySelector('#hora-reserva');
        const inputRestaurante = document.querySelector('#restaurante');

        inputId.value = reservaToUpdate.id;
        inputMail.value = reservaToUpdate.mail;
        inputTelefono.value = reservaToUpdate.telefono;
        inputFechaReserva.value = reservaToUpdate.fechaReserva;
        inputNombre.value = reservaToUpdate.nombre;
        inputNumeroPersonas.value = reservaToUpdate.numeroPersonas;
        inputHoraReserva.value = reservaToUpdate.horaReserva;
        inputRestaurante.value = reservaToUpdate.restaurante;
    }
}

function deleteReserva(reservaId) {
    let reservas = JSON.parse(localStorage.getItem('reservas'));
    let reservaToDelete = reservas.find(reserva => reserva.id === reservaId);
    if (reservaToDelete) {
        reservas = reservas.filter(reserva => reserva.id !== reservaToDelete.id);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        showReservas();
        Swal.fire({
            title: 'Éxito!',
            text: 'La reserva fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const btnSaveReserva = document.querySelector('#btn-save-reserva');
    btnSaveReserva.addEventListener('click', saveReserva);
    showReservas();
});
