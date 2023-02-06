const CACHE_NAME = "version-3";
const assetsToCache = [
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
];

const assetsToRequest = [
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

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(assetsToCache);
            })
    )
});

// Listen for requests
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(() => {
//                 return fetch(event.request)
//                     .catch(() => caches.match('index.html'))
//             })
//     )
// });

// cache first, if miss fetch

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.match(event.request).then(function (response) {
//                 return (
//                     response ||
//                     fetch(event.request).then(function (response) {
//                         cache.put(event.request, response.clone());
//                         return response;
//                     })
//                 );
//             });
//         }),
//     );
// });

// stale while revitalate
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            });
        }),
    );
});

// // network first, if network put updated content in cache
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.match(event.request).then(function (response) {
//                 var fetchPromise = fetch(event.request).then(function (networkResponse) {
//                     cache.put(event.request, networkResponse.clone());
//                     return networkResponse;
//                 });
//                 return fetchPromise || response;
//             });
//         }),
//     );
// });

// // specific assets to fetch
// // network first, if network put updated content in cache
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.match(event.request).then(function (response) {
//                 var requestedAsset = event.request.url.split(event.request.referrer).pop();
//                 if (!requestedAsset) {
//                     requestedAsset = '/';
//                 } else if (requestedAsset !== '/') {
//                     requestedAsset = "/" + requestedAsset;
//                 }
//                 if (assetsToRequest.includes(requestedAsset)) {
//                     var fetchPromise = fetch(event.request).then(function (networkResponse) {
//                         cache.put(event.request, networkResponse.clone());
//                         return networkResponse;
//                     });
//                     return fetchPromise || response;
//                 } else {
//                     return response;
//                 }

//             });
//         }),
//     );
// });

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))

    )
});