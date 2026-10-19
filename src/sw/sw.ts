/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute, type PrecacheEntry } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: (PrecacheEntry | string)[] };

/** Runtime caches created by the webpack-era service worker. */
const LEGACY_CACHES = ['google-fonts-stylesheets', 'google-fonts-webfonts', 'unpkg', 'github', 'twitter'];

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all(LEGACY_CACHES.map((name) => caches.delete(name))));
});

precacheAndRoute(self.__WB_MANIFEST);

// HTML is never precached, so online visitors always get the latest deploy.
registerRoute(new NavigationRoute(new NetworkFirst({ cacheName: 'pages', networkTimeoutSeconds: 3 })));

registerRoute(
  ({ request, url }) => request.destination === 'image' && url.origin === self.location.origin,
  new CacheFirst({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60, purgeOnQuotaError: true })],
  }),
);
