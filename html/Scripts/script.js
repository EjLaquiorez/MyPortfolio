function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


// User Registration (Save to LocalStorage)
function registerUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(user => user.username === username);

  if (userExists) {
      alert("Username already exists! Try a different one.");
      return false;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! You can now log in.");
  return true;
}

// User Login (Check credentials)
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "dashboard.html"; // Redirect to user profile page
  } else {
      alert("Invalid username or password. Try again.");
  }
}

// Handle form submission
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  
  if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          loginUser(username, password);
      });
  }
});
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    registerUser(username, email, password);
  });
}

// Function to load user data in the dashboard
function loadDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("You must log in first!");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("userDisplayName").textContent = currentUser.username;
  document.getElementById("profileUsername").value = currentUser.username;
  document.getElementById("profileEmail").value = currentUser.email;
}

// Function to update user profile
function updateProfile(event) {
  event.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const email = document.getElementById("profileEmail").value;
  const password = document.getElementById("profilePassword").value;

  // Find user in storage
  const userIndex = users.findIndex(user => user.username === currentUser.username);
  if (userIndex !== -1) {
    users[userIndex].email = email;
    if (password) {
      users[userIndex].password = password; // Update password if entered
    }

    // Save updated data
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));

    alert("Profile updated successfully!");
  }
}

// Function to handle logout
function logoutUser() {
  localStorage.removeItem("currentUser");
  alert("You have been logged out!");
  window.location.href = "index.html";
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("profileForm")) {
    loadDashboard();
    document.getElementById("profileForm").addEventListener("submit", updateProfile);
  }

  if (document.getElementById("logoutBtn")) {
    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
  }
});
const navTabs = document.querySelectorAll("#nav-tabs > a");
navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    navTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
  });
});
//last script
document.querySelector(".logout-btn").addEventListener("click", function () {
  alert("You have been logged out!");
  window.location.href = "index.html"; // Redirect to login page
});
