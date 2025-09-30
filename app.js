
// Shared app script for HVAC Helper (client-side only)
document.addEventListener('DOMContentLoaded', () => {
  const USER='rayzel', PASS='hannah123';

  // login link handling (home CTA)
  const loginLinks = document.querySelectorAll('#login-link, #cta-login, #login-btn-home');
  loginLinks.forEach(el=>{ if(el) el.addEventListener('click', showLoginPrompt) });

  // logout button(s)
  const logoutBtns = document.querySelectorAll('#logout-btn');
  logoutBtns.forEach(b=>{ if(b) b.addEventListener('click', ()=>{ alert('Logged out'); window.location.href='index.html'; }) });

  // Camera page handlers
  if (document.body.contains(document.getElementById('startCamera'))) {
    initCameraPage();
  }

  // Video page handlers
  if (document.body.contains(document.getElementById('startRecord'))) {
    initVideoPage();
  }

  // Upload page
  if (document.body.contains(document.getElementById('fileInput'))) {
    initUploadPage();
  }

  // Audio page
  if (document.body.contains(document.getElementById('startAudio'))) {
    initAudioPage();
  }

  // Checklist page
  if (document.body.contains(document.getElementById('exportPdf'))) {
    initChecklistPage();
  }
});

function showLoginPrompt(e){
  e && e.preventDefault && e.preventDefault();
  const u = prompt('Username:');
  const p = prompt('Password:');
  if (u==='rayzel' && p==='hannah123') {
    alert('Login success — opening tools');
    // If on home, go to photo tool as entry point for convenience
    window.location.href = 'photo.html';
  } else {
    alert('Invalid credentials');
  }
}

// ===== Camera Page =====
function initCameraPage(){
  const startBtn = document.getElementById('startCamera');
  const takeBtn = document.getElementById('takePhoto');
  const video = document.getElementById('cameraVideo');
  const canvas = document.getElementById('photoCanvas');
  const preview = document.getElementById('photoPreview');
  const downloadLink = document.getElementById('downloadPhoto');
  let stream=null;
  startBtn.addEventListener('click', async ()=>{
    try{
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      video.srcObject = stream;
      takeBtn.disabled = false;
    }catch(err){ alert('Camera start failed: '+err.message); }
  });
  takeBtn.addEventListener('click', ()=>{
    const w = video.videoWidth || 1280, h = video.videoHeight || 720;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    canvas.toBlob(blob=>{
      const url = URL.createObjectURL(blob);
      preview.innerHTML = '<img src="'+url+'">';
      downloadLink.href = url; downloadLink.classList.remove('hidden');
    }, 'image/jpeg', 0.9);
  });
}

// ===== Video Page =====
function initVideoPage(){
  const startBtn = document.getElementById('startRecord');
  const stopBtn = document.getElementById('stopRecord');
  const preview = document.getElementById('videoPreview');
  const clips = document.getElementById('videoClips');
  const downloadLink = document.getElementById('downloadVideo');
  let mediaRecorder, chunks = [], stream=null;
  startBtn.addEventListener('click', async ()=>{
    try{
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      preview.srcObject = stream;
      chunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e=>{ if(e.data.size) chunks.push(e.data); };
      mediaRecorder.onstop = ()=>{
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const vid = document.createElement('video');
        vid.controls = true; vid.src = url; vid.style.maxWidth='100%';
        clips.innerHTML = ''; clips.appendChild(vid);
        downloadLink.href = url; downloadLink.classList.remove('hidden');
      };
      mediaRecorder.start();
      startBtn.disabled = true; stopBtn.disabled = false;
    }catch(err){ alert('Video start failed: '+err.message); }
  });
  stopBtn.addEventListener('click', ()=>{
    if(mediaRecorder && mediaRecorder.state==='recording') mediaRecorder.stop();
    startBtn.disabled = false; stopBtn.disabled = true;
    if(stream){ stream.getTracks().forEach(t=>t.stop()); preview.srcObject = null; }
  });
}

// ===== Upload Page =====
function initUploadPage(){
  const input = document.getElementById('fileInput');
  const list = document.getElementById('fileList');
  input.addEventListener('change', ()=>{
    list.innerHTML = '';
    Array.from(input.files).forEach(f=>{
      const item = document.createElement('div');
      item.className = 'fileItem';
      if(f.type.startsWith('image/')){
        const img = document.createElement('img'); img.style.maxWidth='180px'; img.style.borderRadius='8px';
        const url = URL.createObjectURL(f); img.src = url; item.appendChild(img);
      } else if(f.type.startsWith('video/')){
        const v = document.createElement('video'); v.controls=true; v.style.maxWidth='280px';
        v.src = URL.createObjectURL(f); item.appendChild(v);
      } else {
        const p = document.createElement('div'); p.textContent = f.name + ' ('+Math.round(f.size/1024)+' KB)'; item.appendChild(p);
      }
      list.appendChild(item);
    });
  });
}

// ===== Audio Page =====
function initAudioPage(){
  const start = document.getElementById('startAudio');
  const stop = document.getElementById('stopAudio');
  const clips = document.getElementById('audioClips');
  const download = document.getElementById('downloadAudio');
  let recorder, chunks=[], stream=null;
  start.addEventListener('click', async ()=>{
    try{
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = e=>{ if(e.data.size) chunks.push(e.data); };
      recorder.onstop = ()=>{
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const au = document.createElement('audio'); au.controls=true; au.src = url;
        clips.innerHTML = ''; clips.appendChild(au);
        download.href = url; download.classList.remove('hidden');
      };
      recorder.start();
      start.disabled=true; stop.disabled=false;
    }catch(err){ alert('Audio start failed: '+err.message); }
  });
  stop.addEventListener('click', ()=>{
    if(recorder && recorder.state==='recording') recorder.stop();
    if(stream){ stream.getTracks().forEach(t=>t.stop()); }
    start.disabled=false; stop.disabled=true;
  });
}

// ===== Checklist Page =====
function initChecklistPage(){
  const addBtn = document.getElementById('addItem');
  const exportBtn = document.getElementById('exportPdf');
  const list = document.getElementById('checklist');
  const jobName = document.getElementById('jobName');
  addBtn.addEventListener('click', ()=>{
    const text = prompt('New checklist item text:');
    if(text){ const li = document.createElement('li'); li.innerHTML = `<label><input type="checkbox"> ${escapeHtml(text)}</label>`; list.appendChild(li); }
  });
  exportBtn.addEventListener('click', ()=>{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rayzel & Hannah HVAC Helper', 14, 20);
    doc.setFontSize(11);
    const now = new Date().toLocaleString();
    doc.text(`Generated: ${now}`, 14, 30);
    if(jobName.value) doc.text(`Job: ${jobName.value}`, 14, 40);
    doc.text('Checklist:', 14, 54);
    const items = Array.from(list.querySelectorAll('li')).map((li,i)=>{
      const chk = li.querySelector('input[type=checkbox]').checked ? '[x]' : '[ ]';
      const txt = li.textContent.trim();
      return `${chk} ${txt}`;
    });
    doc.setFontSize(10);
    doc.text(items, 14, 64);
    doc.save(`HVAC_Checklist_${Date.now()}.pdf`);
  });
}

function escapeHtml(s){ return s.replaceAll('<','&lt;').replaceAll('>','&gt;'); }
