const BOOKINGS_API = 'http://localhost:3000/api/bookings';

function loadBookings() {
  const token = localStorage.getItem('token');
  fetch(token ? `${BOOKINGS_API}/me` : BOOKINGS_API, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById('bookings-list');
      list.innerHTML = '';
      data.forEach((booking) => {
        const card = document.createElement('div');
        card.className = 'card mb-2';
        card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${booking.meal}</h5>
          <p class="card-text">Data: ${booking.date}</p>
          <button class="btn btn-sm btn-warning" onclick="editBooking(${booking.id}, '${booking.date}', '${booking.meal}')">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBooking(${booking.id})">Cancelar</button>
        </div>
      `;
        list.appendChild(card);
      });
    });
}

function showAddBooking() {
  document.getElementById('booking-form-title').innerText =
    'Adicionar Marcação';
  document.getElementById('booking-date').value = '';
  document.getElementById('booking-meal').value = '';
  document.getElementById('booking-form').classList.remove('d-none');
  document.getElementById('dashboard').classList.add('d-none');
}

function editBooking(id, date, meal) {
  document.getElementById('booking-form-title').innerText = 'Editar Marcação';
  document.getElementById('booking-date').value = date;
  document.getElementById('booking-meal').value = meal;
  document.getElementById('booking-form').dataset.id = id;
  document.getElementById('booking-form').classList.remove('d-none');
  document.getElementById('dashboard').classList.add('d-none');
}

function submitBooking(event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const date = document.getElementById('booking-date').value;
  const meal = document.getElementById('booking-meal').value;
  const id = document.getElementById('booking-form').dataset.id;

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${BOOKINGS_API}/${id}` : BOOKINGS_API;
  const body = JSON.stringify({ date, meal });

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => {
      loadBookings();
      cancelBooking();
    });
}

function deleteBooking(id) {
  if (!confirm('Tem a certeza que deseja cancelar esta marcação?')) return;
  const token = localStorage.getItem('token');
  fetch(`${BOOKINGS_API}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      loadBookings();
    });
}

function cancelBooking() {
  document.getElementById('booking-form').classList.add('d-none');
  document.getElementById('dashboard').classList.remove('d-none');
}
