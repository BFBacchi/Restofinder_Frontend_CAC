const BASEURL = 'https://bfbmahakala.pythonanywhere.com/';

async function fetchData(url, method, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'An error occurred while fetching data. Please try again.',
    });
  }
}

async function showReservas() {
  let reservas = await fetchData(`${BASEURL}/api/reservas/`, 'GET');
  console.log(reservas);
  const tableReservas = document.querySelector('#list-table-reservas tbody');
  tableReservas.innerHTML = '';
  reservas.forEach((reserva) => {
    let tr = `
      <tr>
        <td>${reserva.Mail}</td>
        <td>${reserva.Telefono}</td>
        <td>${reserva.Fecha_reserva}</td>
        <td>${reserva.Nombre}</td>
        <td>${reserva.Numero_de_personas}</td>
        <td>${reserva.Hora_de_reserva}</td>
        <td>${reserva.Restaurante}</td>
        <td>
          <button class="btn-cac" onclick='editReserva(${reserva.idreserva})'><i class="fa fa-pencil"></i></button>
          <button class="btn-cac" onclick='deleteReserva(${reserva.idreserva})'><i class="fa fa-trash"></i></button>
        </td>
      </tr>`;
    tableReservas.insertAdjacentHTML("beforeend", tr);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  showReservas();
  const restaurantNames = [
    "Dadá Bistro", "Iñaki", "Mercado del centro", "Petit Colon", "Centro Asturiano", 
    "Fogón Asado", "Parrilla Voro Carnes", "Cabana Las Lilas", "El mirasol de Boedo", 
    "Don Zoilo", "Broccolino", "Marcelo", "Italpast", "Il Gran Caruso", "Clemenza", 
    "Siamo nel Forno", "El Cuartito", "La Continental", "Pizzería La Mezzeta", 
    "Sodapizza", "Barrio Chino", "Mercado de San Nicolás", "Mercado de San Telmo", 
    "Mercado Soho", "Mercat Villa Crespo", "Cocu", "Gontran Cherrier", "Le Blé", 
    "Le Molin de la Fleur", "Le Panem", "Alvear Palace Hotel", "Home Hotel Buenos Aires", 
    "Palacio Duhau", "Four Seasons", "Sheraton Buenos Aires", "Cuervo Café", 
    "Usina Cafetera", "Davax Café", "Rondo Café", "Coffee Town", "Cafe La poesía", 
    "Café Margot", "Café Tortoni", "La Biela Café", "El Gato Negro", "Café 2D", 
    "Hero Café Anime", "MKaffee", "M.C Donuts", "Trixie",
    "La Cabrera", "Don Julio", "El Pobre Luis", "El Ferroviario", "La Carnicería", 
    "Mansión Tango", "Madero Tango", "Señor Tango", "Tango Porteño", "Cátulo", 
    "Niño Gordo", "Nikkai Shokudo", "Saigón", "Una Canción Coreana", "Asian Cantina", 
    "Casa Munay", "Mudra", "Hierbabuena", "Sacro", "Seibo", "Mishiguene", 
    "Restaurant Armenia", "Tandoor", "Las Morochas", "Senses New York"
  ];

  const restaurantSelect = document.getElementById("restaurant");

  // Itera sobre el array de nombres de restaurantes y crea opciones para el select
  restaurantNames.forEach(restaurantName => {
    const option = document.createElement("option");
    option.value = restaurantName;
    option.textContent = restaurantName;
    restaurantSelect.appendChild(option);
  });
});

// Capturar el evento de envío del formulario
document.getElementById("reservationForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores del formulario
  const formData = {
    Nombre: document.getElementById("name").value,
    Mail: document.getElementById("email").value,
    Telefono: document.getElementById("phone").value,
    Fecha_reserva: document.getElementById("date").value,
    Hora_de_reserva: document.getElementById("time").value,
    Numero_de_personas: parseInt(document.getElementById("people").value),
    Restaurante: document.getElementById("restaurant").value
  };

  const idReserva = document.getElementById("reservationForm").dataset.idReserva;

  try {
    if (idReserva) {
      // Actualizar la reserva existente
      const updatedReservation = await updateReservation(idReserva, formData);
      console.log("Reserva actualizada:", updatedReservation);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Reserva actualizada con éxito.',
      });
      document.getElementById("reservationForm").removeAttribute("data-id-reserva");
    } else {
      // Crear una nueva reserva
      const newReservation = await createReservation(formData);
      console.log("Reserva creada:", newReservation);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Reserva realizada con éxito.',
      });
    }

    // Limpiar el formulario y actualizar la tabla de reservas
    document.getElementById("reservationForm").reset();
    document.getElementById("reservationModal").style.display = "none";
    showReservas();
  } catch (error) {
    console.error("Error al gestionar reserva:", error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrió un error al gestionar la reserva. Por favor, inténtalo nuevamente.',
    });
  }
});

// Función para crear una nueva reserva
async function createReservation(formData) {
  const url = `${BASEURL}/api/reservas/`;
  const method = 'POST';

  try {
    const response = await fetchData(url, method, formData);
    return response; // Suponiendo que el servidor responde con la nueva reserva creada
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para actualizar una reserva existente
async function updateReservation(id, formData) {
  const url = `${BASEURL}/api/reservas/${id}`;
  const method = 'PUT';

  try {
    const response = await fetchData(url, method, formData);
    return response; // Suponiendo que el servidor responde con la reserva actualizada
  } catch (error) {
    throw new Error(error.message);
  }
}

function deleteReserva(id) {
  Swal.fire({
    title: "¿Está seguro de eliminar la reserva?",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let response = await fetchData(`${BASEURL}/api/reservas/${id}`, 'DELETE');
      showReservas();
      Swal.fire(response.message, "", "success");
    }
  });
}

async function editReserva(id) {
  // Mostrar el modal
  const reservationModal = document.getElementById("reservationModal");
  reservationModal.style.display = "block";

  // Obtener la reserva del servidor
  let response = await fetchData(`${BASEURL}/api/reservas/${id}`, 'GET');

  // Rellenar el formulario con los datos de la reserva
  document.getElementById("name").value = response.Nombre;
  document.getElementById("email").value = response.Mail;
  document.getElementById("phone").value = response.Telefono;
  document.getElementById("date").value = response.Fecha_reserva;
  document.getElementById("time").value = formatTime(response.Hora_de_reserva);
  document.getElementById("people").value = response.Numero_de_personas;
  document.getElementById("restaurant").value = response.Restaurante;

  // Cambiar el texto del botón de "Reservar" a "Guardar"
  const submitButton = document.querySelector("#reservationForm button[type='submit']");
  submitButton.textContent = "Guardar";

  // Guardar el ID de la reserva en el formulario
  document.getElementById("reservationForm").dataset.idReserva = id;
}
// Función para convertir el formato de hora a "HH:mm"
function formatTime(timeString) {
  // Asumiendo que timeString viene en formato 'HH:MM:SS' o 'HH:MM:SS.mmm'
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}