const API_URL = 'http://localhost:3000/api/auth';

function showLogin() {
  document.getElementById('login-form').classList.remove('d-none');
  document.getElementById('register-form').classList.add('d-none');
  document.getElementById('dashboard').classList.add('d-none');
}

function showRegister() {
  document.getElementById('register-form').classList.remove('d-none');
  document.getElementById('login-form').classList.add('d-none');
  document.getElementById('dashboard').classList.add('d-none');
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        updateUI();
      } else {
        alert(data.message);
      }
    });
}

function register(event) {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
      if (data.message === 'Utilizador registado com sucesso!') {
        showLogin();
      }
    });
}

function logout() {
  localStorage.removeItem('token');
  updateUI();
}
