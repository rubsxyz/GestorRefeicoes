function updateUI() {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('nav-login').classList.add('d-none');
    document.getElementById('nav-register').classList.add('d-none');
    document.getElementById('nav-logout').classList.remove('d-none');
    document.getElementById('login-form').classList.add('d-none');
    document.getElementById('register-form').classList.add('d-none');
    document.getElementById('dashboard').classList.remove('d-none');
    loadBookings();
  } else {
    document.getElementById('nav-login').classList.remove('d-none');
    document.getElementById('nav-register').classList.remove('d-none');
    document.getElementById('nav-logout').classList.add('d-none');
    document.getElementById('dashboard').classList.add('d-none');
    document.getElementById('booking-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
  }
}

// Inicializar UI
document.addEventListener('DOMContentLoaded', updateUI);
