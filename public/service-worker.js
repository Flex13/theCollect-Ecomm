const CACHE_NAME = 'TheCollect-cache';
const toCache = [
    '/',
    '/products',
    '/login',
    '/reset',
    '/register',
    '/js/status.js',
    './css/bootstrap.min.css',
    './css/nav.css',
    './css/style.css',
    '/favicon-16x16.png',
    './icons/favicon-32x32.png',
    './js/pwa.webmanifest',
    './js/pwa.js',
    '/icons/icon-144x144.png',
];

self.addEventListener('install', function(event) {
    console.log('used to register the service worker 1')
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    console.log('used to intercept requests so we can check for the file or data in the cache 2')
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match(event.request)
                })
        })
    )
})

self.addEventListener('activate', function(event) {
    console.log('this event triggers when the service worker activates 3')
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
        .then(() => self.clients.claim())
    )
})