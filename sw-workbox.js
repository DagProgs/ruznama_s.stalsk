importScripts('workbox-v4.3.1/workbox-sw.js');

// SETTINGS

// Path prefix to load modules locally
workbox.setConfig({
  modulePathPrefix: 'workbox-v4.3.1/'
});

// Turn on logging
workbox.setConfig({
  debug: true
});

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "436f314384326622b4e439afd9d4fe28"
  },
  {
    "url": "main.js",
    "revision": "80846bb3403b82a07c7f84658f186b23"
  },
  {
    "url": "polyfills.js",
    "revision": "56f34b0f4d3a42d45bfdb1782adaa173"
  },
  {
    "url": "pwacompat.min.js",
    "revision": "038770ef3eb91f3e8a50a3916cb7cf28"
  },
  {
    "url": "runtime.js",
    "revision": "cd1ce3e306bf57f272364d1cc0249d6e"
  },
  {
    "url": "update.js",
    "revision": "2e37a1e61c0f6c88bddbb61150536944"
  },
  {
    "url": "assets/icons/icon-128x128.png",
    "revision": "2fbd79f7f6107da35a95efb4f805742d"
  },
  {
    "url": "assets/icons/icon-144x144.png",
    "revision": "686a3fbd4db6d719a4c1a505472a7037"
  },
  {
    "url": "assets/icons/icon-152x152.png",
    "revision": "c5b2ccd2b078822dee92ad39cf88fe0a"
  },
  {
    "url": "assets/icons/icon-192x192.png",
    "revision": "739f8b432fed3877adc74bb43bd79bbb"
  },
  {
    "url": "assets/icons/icon-384x384.png",
    "revision": "6a0e383e5990062bb50125453d93b0bd"
  },
  {
    "url": "assets/icons/icon-48x48.png",
    "revision": "93640daeecfe6c5d821aa5d38d41b6e4"
  },
  {
    "url": "assets/icons/icon-512x512.png",
    "revision": "050590eb0615768912726f4d60fe056b"
  },
  {
    "url": "assets/icons/icon-72x72.png",
    "revision": "347a288a320ba791f8e3582a2f31e680"
  },
  {
    "url": "assets/icons/icon-96x96.png",
    "revision": "327268db4564cbb29fa28ced382769db"
  }
]);

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)timeline/,
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
  workbox.strategies.cacheFirst()
)

// OTHER EVENTS

// Receive push and show a notification
self.addEventListener('push', function(event) {
  console.log('[Service Worker]: Received push event', event);
});
