// task.js

async function fetchTasks() {
  const token = localStorage.getItem("token");
  console.log("After login I will fetch tasks.", token);

  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      console.log("I will display tasks");
      displayTasks(data.tasks); // Update the task list dynamically
    } else {
      console.error("Failed to fetch tasks:", data.message);
      alert("Failed to load tasks");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Function to display tasks on the page
function displayTasks(tasks) {
  const pendingTaskList = document.getElementById("pending-task-list");
  const completedTaskList = document.getElementById("completed-task-list");

  pendingTaskList.innerHTML = ""; // Clear previous pending tasks
  completedTaskList.innerHTML = ""; // Clear previous completed tasks

  if (tasks.length === 0) {
    pendingTaskList.innerHTML = "<li>No tasks found</li>";
    completedTaskList.innerHTML = "<li>No tasks found</li>";
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item";
    taskItem.id = `task-${task.id}`;

    taskItem.innerHTML = `
        <strong>${task.title}</strong> - ${task.description}
        <span class="task-details">
          <span class="badge bg-${task.status === "completed" ? "success" : "warning"}">${task.status}</span>
          <span class="badge bg-info">${new Date(task.date).toLocaleDateString()}</span>
        </span>
        <div class="btn-group btn-group-sm float-right">
          <button class="btn btn-info" onclick="openEditModal(${task.id}, '${task.title}', '${task.description}', '${
      task.status
    }', '${task.date}')">Edit</button>
          <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;

    if (task.status === "pending") {
      pendingTaskList.appendChild(taskItem);
    } else {
      completedTaskList.appendChild(taskItem);
    }
  });
}

function openEditModal(id, title, description, status, date) {
  document.getElementById("task-id").value = id;
  document.getElementById("task-title").value = title;
  document.getElementById("task-desc").value = description;
  document.getElementById("task-status").value = status;
  document.getElementById("task-date").value = date;

  const taskModal = new bootstrap.Modal(document.getElementById("taskModal"));
  taskModal.show();

  // Bind the form submission event
  document.getElementById("task-form").onsubmit = function (event) {
    event.preventDefault();
    updateTask(id); // Update task and refresh the list
  };
}

// Function to add a new task
async function addTask() {
  const token = localStorage.getItem("token");
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const status = document.getElementById("task-status").value;
  const date = document.getElementById("task-date").value;

  if (!title || !description || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const newTask = {
    title: title,
    description: description,
    status: status,
    date: date,
  };

  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    document.getElementById("task-form").reset(); // Clear the form
    fetchTasks(); // Refresh the task list
    const taskModal = bootstrap.Modal.getInstance(document.getElementById("taskModal"));
    taskModal.hide(); // Close the modal
  } catch (error) {
    console.error("Failed to add task:", error);
  }
}

// Function to delete a task
async function deleteTask(id) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    fetchTasks(); // Refresh the task list
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
}

// Function to update an existing task
async function updateTask(id) {
  const token = localStorage.getItem("token");
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const status = document.getElementById("task-status").value;
  const date = document.getElementById("task-date").value;

  if (!title || !description || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const updatedTask = {
    title: title,
    description: description,
    status: status,
    date: date,
  };

  try {
    const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update task.");
    }

    document.getElementById("task-form").reset(); // Clear the form
    fetchTasks(); // Refresh the task list
    const taskModal = bootstrap.Modal.getInstance(document.getElementById("taskModal"));
    taskModal.hide(); // Close the modal
  } catch (error) {
    console.error("Failed to update task:", error);
  }
}
