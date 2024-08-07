// Obtener los elementos del formulario
const reservationForm = document.getElementById("reservationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const peopleInput = document.getElementById("people");
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i'); 
const dropDownMenu = document.querySelector('.dropdown_menu');


// Obtener los botones y el modal del form
const openModalButtons = document.querySelectorAll('.action_btn');
const closeModalButton = document.getElementById("closeModalButton");
const reservationModal = document.getElementById("reservationModal");
// Obtener los botones y el modal de la ubicacion
const locationLink = document.getElementById('locationLink');
const locationModalLink = document.getElementById('locationModalLink');
const locationModal = document.getElementById('locationModal');
const closeLocationModalButton = document.getElementById('closeLocationModalButton');
// Selecciona todos los elementos de los nombres de restaurantes
const restaurantDivs = document.querySelectorAll(".pages-resto-div h3");
const restaurantSelect = document.getElementById("restaurant");



// Función para abrir el modal
openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Mostrar el modal
        reservationModal.style.display = "block";
        dropDownMenu.classList.add('closed');
        resetForm();
    });
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
        errorMessage += "El número de teléfono no es válido. debe tener 10 digitos\n";
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


toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
    
}

locationLink.addEventListener('click', function (event) {
    event.preventDefault();
    locationModal.style.display = 'block';
});

locationModalLink.addEventListener('click', function (event) {
    event.preventDefault();
    locationModal.style.display = 'block';
});


closeLocationModalButton.addEventListener('click', function () {
    locationModal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === locationModal) {
        locationModal.style.display = 'none';
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Array de nombres de restaurantes
    
});

function mostrarAlerta() {
    Swal.fire({
        title: 'Explora la gastronomía de Buenos Aires',
        text: 'Encuentra los mejores sitios gastronómicos en la ciudad de Buenos Aires con nuestra guía detallada.',
        icon: 'info',
        confirmButtonText: 'Visitar Sitio',
        footer: '<a href="https://www.buenosaires.gob.ar/cultura/gastronomia">Más información</a>'
    });
}
function mostrarAlertaContacto() {
    Swal.fire({
        title: 'Contacto',
        html: `
            <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos:</p>
            <ul>
                <li><strong>Email:</strong> contacto@sitiosgastronomicosba.com</li>
                <li><strong>Teléfono:</strong> +54 11 1234 5678</li>
                <li><strong>Dirección:</strong> Av. Siempre Viva 123, Buenos Aires, Argentina</li>
            </ul>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
}

function mostrarAlertaInicioSesion() {
    Swal.fire({
        title: 'Iniciar Sesión',
        html: `
            <input type="text" id="username" class="swal2-input" placeholder="Nombre de usuario">
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const username = Swal.getPopup().querySelector('#username').value;
            const password = Swal.getPopup().querySelector('#password').value;
            if (!username || !password) {
                Swal.showValidationMessage('Por favor, ingresa tu nombre de usuario y contraseña');
            }
            return { username: username, password: password };
        },
        confirmButtonText: 'Iniciar Sesión',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const { username, password } = result.value;
            // Aquí puedes manejar la lógica de inicio de sesión con los valores username y password
            console.log(`Nombre de usuario: ${username}, Contraseña: ${password}`);
            Swal.fire(`Bienvenido, ${username}!`);
        }
    });
}