const CACHE_NAME = 'wpdf-shell-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/assets/css/app.css',
  '/assets/js/app.js',
  '/assets/js/pdf/core.js',
  '/assets/js/pdf/merge.js',
  '/assets/js/pdf/split.js',
  '/assets/js/pdf/edit.js',
  '/assets/js/pdf/numbers.js',
  '/assets/js/pdf/images.js',
  '/manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('/index.html')))
  );
});
