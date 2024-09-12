document
  .getElementById('booking-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const mealType = document.getElementById('mealType').value;
    const date = document.getElementById('date').value;

    // Simular inserção no banco de dados usando Local Storage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({mealType, date});
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert('Refeição agendada: ' + mealType + ' para ' + date);

    // Aqui você pode adicionar código para interagir com um servidor real ou uma API
  });
