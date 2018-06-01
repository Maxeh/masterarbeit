/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */

'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json',
    './assets/weather/01d.png',
    './assets/weather/01n.png',
    './assets/weather/02d.png',
    './assets/weather/02n.png',
    './assets/weather/03d.png',
    './assets/weather/03n.png',
    './assets/weather/04d.png',
    './assets/weather/04n.png',
    './assets/weather/09d.png',
    './assets/weather/09n.png',
    './assets/weather/10d.png',
    './assets/weather/10n.png',
    './assets/weather/11d.png',
    './assets/weather/11n.png',
    './assets/weather/13d.png',
    './assets/weather/13n.png',
    './assets/weather/50d.png',
    './assets/weather/50n.png',
    './assets/imgs/logo.png',
    './assets/icon/favicon.ico',
    './assets/fonts/ionicons.woff',
    './assets/fonts/ionicons.woff2'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.networkFirst);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
