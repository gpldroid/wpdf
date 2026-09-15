const CACHE_NAME = 'wpdf-shell-v4';
const BASE = '/wpdf/';
const APP_SHELL = [
  BASE,
  `${BASE}index.html`,
  `${BASE}pdf-editor.html`,
  `${BASE}privacy.html`,
  `${BASE}terms.html`,
  `${BASE}assets/css/app.css`,
  `${BASE}assets/js/app.js`,
  `${BASE}assets/js/pdf/core.js`,
  `${BASE}assets/js/pdf/index.js`,
  `${BASE}assets/js/pdf/merge.js`,
  `${BASE}assets/js/pdf/split.js`,
  `${BASE}assets/js/pdf/edit.js`,
  `${BASE}assets/js/pdf/numbers.js`,
  `${BASE}assets/js/pdf/images.js`,
  `${BASE}assets/js/pdf/security.js`,
  `${BASE}assets/js/pdf/convert.js`,
  `${BASE}assets/js/pdf/convert-word.js`,
  `${BASE}assets/js/pdf/convert-excel.js`,
  `${BASE}assets/js/pdf/convert-ppt.js`,
  `${BASE}assets/icons/icon.svg`,
  `${BASE}manifest.webmanifest`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(`${BASE}index.html`));
    })
  );
});
