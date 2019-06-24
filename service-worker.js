// we'll version our cache (and learn how to delete caches in some other post)
const cacheName = 'v1::static';
// const cacheName = 'v1::static';
const assetsToCache = [
    '/',
    '/_ionicons_svg_md-copy.png',
    // Should these be cached?
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/browserconfig.xml',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/mstile-70x70.png',
    '/mstile-144x144.png',
    '/mstile-150x150.png',
    '/mstile-310x150.png',
    '/mstile-310x310.png',
    '/safari-pinned-tab.svg',
    '/manifest.webmanifest',
];

self.addEventListener('install', e => {
    // once the SW is installed, go ahead and fetch the resources
    // to make this work offline
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assetsToCache).then(() => self.skipWaiting());
        })
    );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
    const request = event.request.mode === 'navigate' ? new Request('/') : event.request;
    event.respondWith(caches.match(request).then(cachedResponse => cachedResponse || fetch(request)));
});
