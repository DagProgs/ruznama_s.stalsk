const staticCacheName = 's-stalsk-v6';
const dynamicCacheName = 'd-stalsk-v7';

const staticAssets = [
    './index.html'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Сервисный работник установлен');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
            console.log(`Удален кэш: ${key}`);
        }
    });
    await Promise.all(checkKeys);
    
    // Принудительное очищение кэша при активации
    await caches.delete(staticCacheName);
    await caches.delete(dynamicCacheName);
    console.log('Старые кэши очищены');
    
    console.log('Сервисный работник активирован');
});

self.addEventListener('fetch', event => {
    console.log(`Попытка получить ${event.request.url}`);
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
            return caches.match('/offline.html');
        } else {
            return caches.match('/offline.html');
        }
    }
}
