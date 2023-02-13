var cacheName = 'phaser-v2';
var filesToCache = [
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
 
self.addEventListener('install', function(event) {
  console.log('установка sw');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw кеширует файлы');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});


self.addEventListener('fetch', (event) => {

  console.log('sw fetch');

  console.log(event.request.url);

  event.respondWith(

    caches.match(event.request).then(function(response) {

      return response || fetch(event.request);

    }).catch(function (error) {

      console.log(error);

    })

  );

});

self.addEventListener('activate', function(event) {

  console.log('событие activate sw');

  event.waitUntil(

    caches.keys().then(function(keyList) {

      return Promise.all(keyList.map(function(key) {

        if (key !== cacheName) {

          console.log('удаление старого кеша sw', key);

          return caches.delete(key);

        }

      }));

    })

  );

})





