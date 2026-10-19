/// <reference lib="webworker" />

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

const SECONDS_IN_A_DAY = 24 * 60 * 60;
const ONE_WEEK_EXPIRE = new ExpirationPlugin({
  maxAgeSeconds: 7 * SECONDS_IN_A_DAY,
});

declare const self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

registerRoute(
  new RegExp('^https://unpkg.com/(.*).json$'),
  new CacheFirst({
    cacheName: 'unpkg',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      ONE_WEEK_EXPIRE,
    ],
  }),
);

registerRoute(
  new RegExp('^https://api.github.com/(.*)'),
  new CacheFirst({
    cacheName: 'github',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      ONE_WEEK_EXPIRE,
    ],
  }),
);

/* eslint-disable-next-line */
precacheAndRoute((self as any).__WB_MANIFEST);
