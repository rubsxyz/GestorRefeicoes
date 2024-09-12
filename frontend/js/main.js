window.onload = function () {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (token) {
    // User is logged in
    document.getElementById("task-app-container").style.display = "block";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("logout-item").style.display = "block";
    document.getElementById("signup-item").style.display = "none"; // Hide sign-up button

    if (username) {
      updateNavbarForLoggedInUser(username);
    } else {
      // Fetch user info if needed and update navbar
      // Example: fetchUserInfo().then(userInfo => {
      //   updateNavbarForLoggedInUser(userInfo.username);
      // });
      console.error("Username not found in localStorage.");
    }

    fetchTasks(); // Fetch tasks to display
  } else {
    // User is not logged in
    document.getElementById("task-app-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("logout-item").style.display = "none";
    document.getElementById("signup-item").style.display = "block"; // Show sign-up button
  }
};
