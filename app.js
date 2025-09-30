document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const login = document.getElementById("login-screen");
  const app = document.getElementById("main-app");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const errorMsg = document.getElementById("login-error");

  // ✅ Correct login
  const CORRECT_USER = "rayzel";
  const CORRECT_PASS = "hannah123";

  // Show login after splash
  setTimeout(() => {
    splash.classList.add("hidden");
    login.classList.remove("hidden");
  }, 1500);

  // Handle login
  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === CORRECT_USER && pass === CORRECT_PASS) {
      login.classList.add("hidden");
      app.classList.remove("hidden");
      errorMsg.classList.add("hidden");
    } else {
      errorMsg.textContent = "Invalid username or password.";
      errorMsg.classList.remove("hidden");
    }
  });

  // Handle logout
  logoutBtn.addEventListener("click", () => {
    app.classList.add("hidden");
    login.classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
});

// Placeholder functions
function openCamera() { alert("Camera function coming soon..."); }
function openVideo() { alert("Video recording coming soon..."); }
function uploadFile() { alert("File upload coming soon..."); }
function recordAudio() { alert("Audio recording coming soon..."); }
function showChecklist() { alert("Checklist feature coming soon..."); }
