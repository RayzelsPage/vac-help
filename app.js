document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const loginScreen = document.getElementById('login-screen');
  const app = document.getElementById('app');
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const loginError = document.getElementById('login-error');

  const USER = 'rayzel';
  const PASS = 'hannah123';

  // show splash then login
  setTimeout(() => {
    splash.classList.add('hidden');
    loginScreen.classList.remove('hidden');
  }, 1400);

  loginBtn.addEventListener('click', () => {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (u === USER && p === PASS) {
      loginError.classList.add('hidden');
      loginScreen.classList.add('hidden');
      app.classList.remove('hidden');
    } else {
      loginError.classList.remove('hidden');
    }
  });

  logoutBtn.addEventListener('click', () => {
    app.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  });
});

function openCamera(){alert('Camera feature coming soon — use phone camera to take a photo.');}
function openVideo(){alert('Video feature coming soon — record a short video.');}
function uploadFile(){alert('Upload feature coming soon — upload photos, videos, audio.');}
function recordAudio(){alert('Audio feature coming soon — record a short clip.');}
function showChecklist(){alert('Checklist feature coming soon — create & tick items.');}
