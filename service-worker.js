// Service Worker - Offline çalışma için
const CACHE_NAME = 'calculator-v1';
const urlsToCache = [
  '/calculator/',
  '/calculator/index.html',
  '/calculator/style.css',
  '/calculator/script.js'
];

// Kurulum - dosyaları cache'e al
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch - cache'ten veya network'ten getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Aktivasyon - eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
