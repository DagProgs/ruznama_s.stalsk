const staticCacheName = 'static-stalsk-v12'
const dynamicCacheName = 'dynamic-stalsk-v12'

const staticAssets = [
    './',
    './index.html',
    './images/icons/icon-128x128.png',
    './images/icons/icon-192x192.png',
    './offline.html',
	'./css/font-awesome.min.css',
	'./css/index.css',
	'./css/Untitled1.css',
    './js/app.js',
    './js/main.js',
	'./js/jquery.hijri.date.min',
	'./js/jquery-3.6.0.min.js',
	'./js/jquery.min.js',
	'./js/dayruznama.js',
	'./js/script.js.js',
	'./js/wwb18.min.js',
    './images/no-image.jpg'
];




self.addEventListener('install', event => {
    console.log('install');
    event.waitUntil(
        Promise.all([
            // caches.open('one')
            caches.open(staticCacheName)
                .then(cache => cache.addAll(staticAssets)) //Может быть возвращаемое значение, я не знаю
                .then(ok => console.log('add all ok'), e => console.log(e))
            ,
            //  Очистить старые версии
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'two') {
                            console.log('Очистить',cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});



self.addEventListener('activate', event => {
    console.log('two now ready to handle fetches!');
    event.waitUntil(
        Promise.all([
            // Очищаем старую версию
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'staticCacheName' 'dynamicCacheName') {
                            console.log('Очистить',cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});




