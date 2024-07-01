const BASEURL = 'http://127.0.0.1:5000';

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
    alert('An error occurred while fetching data. Please try again.');
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
          <button class="btn-cac" onclick='updateReserva(${reserva.id_reserva})'><i class="fa fa-pencil"></i></button>
          <button class="btn-cac" onclick='deleteReserva(${reserva.id_reserva})'><i class="fa fa-trash"></i></button>
        </td>
      </tr>`;
    tableReservas.insertAdjacentHTML("beforeend", tr);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  showReservas();
});
