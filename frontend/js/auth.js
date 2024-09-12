let isLoggedOut = false; // Declare this outside of any function

async function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username); // Save username for display
      document.getElementById("task-app-container").style.display = "block";
      document.getElementById("login-container").style.display = "none";
      document.getElementById("logout-item").style.display = "block";
      isLoggedOut = false; // Reset the flag after successful login
      updateNavbarForLoggedInUser(username); // Update navbar with username
      fetchTasks(); // Fetch tasks immediately
    } else if (response.status === 401) {
      // Unauthorized: Incorrect username or password
      console.error("Login failed: Incorrect username or password.");
      alert("Incorrect username or password. Please try again.");
    } else {
      // Other errors
      console.error("Login failed:", data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please try again.");
  }
}

async function registerUser() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  try {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Registration successful
      console.log("Registration successful:", data);

      // Stay on the login page (login form)
      alert("Registration successful! Please log in with your new credentials.");

      // Close the registration modal
      const registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
      registerModal.hide();
    } else if (response.status === 400) {
      // Bad Request: User already exists
      console.error("Registration failed: User already exists.");
      alert("Username already exists. Please choose a different username.");
    } else {
      // Other errors
      console.error("Registration failed:", data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again.");
  }
}

// Helper function to log in user immediately after successful registration
async function loginUserAfterRegistration(username, password) {
  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Save token to localStorage
      localStorage.setItem("username", username); // Save username for display
      document.getElementById("task-app-container").style.display = "block";
      document.getElementById("login-container").style.display = "none";
      document.getElementById("logout-item").style.display = "block";
      updateNavbarForLoggedInUser(username); // Update navbar with username
      //fetchTasks(); // Fetch tasks immediately
    } else {
      console.error("Login after registration failed:", data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error("Error during login after registration:", error);
    alert("Login failed. Please try again.");
  }
}

function updateNavbarForLoggedInUser(username) {
  document.getElementById("signup-item").style.display = "none"; // Hide sign-up button
  document.getElementById("username-display").innerText = username;

  // Display avatar based on username (using Robohash for example)
  document.querySelector("#user-info img").src = `https://robohash.org/${username}`;

  document.getElementById("user-info").style.display = "block"; // Show user info
  document.getElementById("logout-item").style.display = "block"; // Show logout button
}

// Function to handle user logout
function logoutUser() {
  if (isLoggedOut) return; // Prevent multiple logouts
  isLoggedOut = true; // Set flag to true after first logout
  localStorage.removeItem("token"); // Clear token from localStorage
  localStorage.removeItem("username"); // Clear username from localStorage
  document.getElementById("task-app-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
  document.getElementById("logout-item").style.display = "none";
  document.getElementById("user-info").style.display = "none"; // Hide user info after logout
  alert("You have successfully logged out.");
}
