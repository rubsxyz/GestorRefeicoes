document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const bookingSection = document.getElementById('bookingSection');
  const loginSection = document.getElementById('loginSection');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/index.html';
        } else {
          alert('Login Failed: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/index.html';
        } else {
          alert('Registration Failed: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/index.html';
        } else {
          alert('Login Failed: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/index.html';
        } else {
          alert('Registration Failed: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });
});
