// Obtener los elementos del formulario
const reservationForm = document.getElementById("reservationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const peopleInput = document.getElementById("people");

// Obtener los botones y el modal
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const reservationModal = document.getElementById("reservationModal");

// Función para abrir el modal
openModalButton.addEventListener("click", () => {
    // Mostrar el modal
    reservationModal.style.display = "block";
    // Limpiar el formulario
    resetForm();
});

// Función para cerrar el modal
closeModalButton.addEventListener("click", () => {
    reservationModal.style.display = "none";
});

// Función para cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
    if (event.target == reservationModal) {
        reservationModal.style.display = "none";
    }
});

// Función para restablecer el formulario
function resetForm() {
    reservationForm.reset();
}

// Función para validar el formulario
function validateForm() {
    let isValid = true;
    let errorMessage = "";

    // Validar nombre
    if (nameInput.value.trim() === "") {
        errorMessage += "El nombre es requerido.\n";
        isValid = false;
    }

    // Validar correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        errorMessage += "El correo electrónico no es válido.\n";
        isValid = false;
    }

    // Validar número de teléfono
    const phonePattern = /^[0-9]{10}$/; // Asegúrate de adaptar el patrón a tus necesidades
    if (!phonePattern.test(phoneInput.value.trim())) {
        errorMessage += "El número de teléfono no es válido.\n";
        isValid = false;
    }

    // Validar fecha
    if (dateInput.value.trim() === "") {
        errorMessage += "La fecha de reserva es requerida.\n";
        isValid = false;
    } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        if (selectedDate < today) {
            errorMessage += "La fecha de reserva no puede ser anterior a hoy.\n";
            isValid = false;
        }
    }

    // Validar hora
    if (timeInput.value.trim() === "") {
        errorMessage += "La hora de reserva es requerida.\n";
        isValid = false;
    }

    // Validar número de personas
    const people = parseInt(peopleInput.value);
    if (isNaN(people) || people <= 0) {
        errorMessage += "El número de personas debe ser un número positivo.\n";
        isValid = false;
    }

    // Mostrar mensajes de error si hay errores
    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}

// Capturar el evento de envío del formulario
reservationForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Validar el formulario antes de enviar
    if (validateForm()) {
        // Si la validación es exitosa, puedes manejar los datos de la reserva aquí
        alert("Reserva realizada con éxito.");
        reservationModal.style.display = "none";
        // Aquí puedes agregar el código para enviar los datos a tu servidor si es necesario
    }
});
