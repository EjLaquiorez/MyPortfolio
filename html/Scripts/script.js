// -------------------- MENU TOGGLE -------------------- //
// Toggle Sidebar for Small Screens
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  sidebar.classList.toggle('show');
  menuBtn.classList.toggle('active');
}


// -------------------- SIDEBAR TOGGLE -------------------- //
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

// Toggle sidebar on menu button click
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  content.classList.toggle("expanded");
});

// Automatically hide/show sidebar based on window size
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed");
    content.classList.add("expanded");
  } else {
    sidebar.classList.remove("collapsed");
    content.classList.remove("expanded");
  }
});

// Initial check on page load
if (window.innerWidth <= 768) {
  sidebar.classList.add("collapsed");
  content.classList.add("expanded");
}

// -------------------- USER AUTHENTICATION -------------------- //
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
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    const passwordInput = document.getElementById("password");
    passwordInput.setCustomValidity("Invalid username or password. Try again.");
    passwordInput.reportValidity();
  }
}

// -------------------- FORM HANDLERS -------------------- //
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      loginUser(username, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("registerUsername").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      registerUser(username, email, password);
    });
  }
});

// -------------------- DASHBOARD FUNCTIONS -------------------- //
// Load user data in the dashboard
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

// Update user profile
function updateProfile(event) {
  event.preventDefault();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const email = document.getElementById("profileEmail").value;
  const password = document.getElementById("profilePassword").value;

  const userIndex = users.findIndex(user => user.username === currentUser.username);
  if (userIndex !== -1) {
    users[userIndex].email = email;
    if (password) {
      users[userIndex].password = password; // Update password if entered
    }

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));
    alert("Profile updated successfully!");
  }
}

// Logout user
function logoutUser() {
  localStorage.removeItem("currentUser");
  alert("You have been logged out!");
  window.location.href = "index.html";
}

// -------------------- PROFILE MENU -------------------- //
// Toggle profile menu visibility
function toggleProfileMenu() {
  const menu = document.getElementById("profile-menu");
  menu.classList.toggle("hidden");
}

// Close profile menu if clicked outside
window.onclick = function (event) {
  if (!event.target.matches(".profile-icon")) {
    const menu = document.getElementById("profile-menu");
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  }
};

// -------------------- EVENT LISTENERS -------------------- //
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("profileForm")) {
    loadDashboard();
    document.getElementById("profileForm").addEventListener("submit", updateProfile);
  }

  if (document.getElementById("logoutBtn")) {
    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
  }
});

// -------------------- LOGOUT MODAL -------------------- //
function showLogoutModal() {
  document.getElementById("logout-modal").classList.remove("hidden");
}

function confirmLogout() {
  window.location.href = "index.html";
}

function closeModal() {
  document.getElementById("logout-modal").classList.add("hidden");
}

