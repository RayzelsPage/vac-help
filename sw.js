self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
});
self.addEventListener('fetch', (e) => {
  // network-first for dynamic content; simple cache strategy could be added
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});