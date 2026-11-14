// Self-destructing & Cache-Flushing Service Worker for Lasya Water Purifier
// Ensures clients always receive 100% fresh, live code directly from server without caching traps

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      return self.registration.unregister();
    })
  );
});

// Always pass all requests directly to the network without caching
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
