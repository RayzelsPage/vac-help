document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const login = document.getElementById("login-screen");
  const app = document.getElementById("main-app");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const errorMsg = document.getElementById("login-error");

  setTimeout(() => {
    splash.classList.add("hidden");
    login.classList.remove("hidden");
  }, 1500);

  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === "ray" && pass === "1234") {
      login.classList.add("hidden");
      app.classList.remove("hidden");
    } else {
      errorMsg.classList.remove("hidden");
    }
  });

  logoutBtn.addEventListener("click", () => {
    app.classList.add("hidden");
    login.classList.remove("hidden");
  });
});

function openCamera() {
  alert("Camera function coming soon...");
}
function openVideo() {
  alert("Video recording coming soon...");
}
function uploadFile() {
  alert("File upload coming soon...");
}
function recordAudio() {
  alert("Audio recording coming soon...");
}
function showChecklist() {
  alert("Checklist feature coming soon...");
}
