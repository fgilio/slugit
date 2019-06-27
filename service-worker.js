// We need this to version the cache
const staticAssetsCacheName = 'static::v4';
// These are all the assets we'll cache
const staticAssets = [
    '/',
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

/*
 * First the Service Worker needs to be installed
 */
self.addEventListener('install', event => {
    console.log('Service Worker install');
    event.waitUntil(cacheResources());
});
async function cacheResources() {
    const cache = await caches.open(staticAssetsCacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
}

/*
 * Then it's activated, this normally happens when the page is refreshed
 */
self.addEventListener('activate', event => {
    console.log('Service Worker activate');
    // Remove previous cached data, if any
    event.waitUntil(removeOldCachedResources());
});
async function removeOldCachedResources() {
    const cachesKeys = await caches.keys();
    return await Promise.all(
        cachesKeys.map(cacheKey => {
            if (staticAssetsCacheName !== cacheKey) {
                return caches.delete(cacheKey);
            }
        })
    );
}

/*
 * This even fires each time the browser makes a request.
 * We can responde from the cache, construct a response
 * from scratch or fallback to the network
 */
self.addEventListener('fetch', event => {
    console.log('Service Worker fetch: ' + event.request.url);
    event.respondWith(returnCachedResponseOrFetch(event));
});
async function returnCachedResponseOrFetch(event) {
    const request = event.request.mode === 'navigate' ? new Request('/') : event.request;
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}
