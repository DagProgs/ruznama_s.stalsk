
const staticCacheName = 'static-cache-v6';
const dynamicCacheName = 'dynamic-cache-v6';

const staticAssets = [
    './',
    './index.html',
	'./css/font-awesome.min.css',
	'./css/index.css',
	'./css/Untitled1.css',
	'./js/dayruznama.js',
	'./js/jquery.hijri.date.min.js',
	'./js/jquery.min.js',
	'./js/jquery-3.6.0.min.js',
	'./js/script.js',
	'./js/wwb18.min.js',
	'./db/ruznama_kasumkent.db',
	'./index.html',
    './manifest.json',
    './css/font-awesome.min.css',
	'./css/index.css',
	'./css/Untitled1.css',
	'./js/dayruznama.js',
	'./js/jquery.hijri.date.min.js',
	'./js/jquery.min.js',
	'./js/jquery-3.6.0.min.js',
	'./js/script.js',
	'./js/wwb18.min.js',
	'./db/ruznama_kasumkent.db',
    './serviceworker.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}