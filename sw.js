// Tools Box — офлайн-кэш витрины. Всегда сначала сеть (no-cache), кэш — только без интернета.
// При изменении файлов витрины увеличь VERSION.
const VERSION = 'toolsbox-v5';
const FILES = ['./', './index.html', './apps/list.js', './shared/tg.js', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './apps/organizer/icon.png', './apps/phone-to-tv/icon.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('toolsbox-') && k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request; if (r.method !== 'GET') return;
  const url = new URL(r.url);
  // Только файлы витрины (папка tools-box), не трогаем другие сайты на том же github.io
  if (url.origin === location.origin && url.pathname.startsWith(new URL('./', self.location).pathname)) {
    e.respondWith(fetch(r, { cache: 'no-cache' }).then((res) => { if (res.ok) { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then((m) => m || (r.mode === 'navigate' ? caches.match('./index.html') : undefined))));
  } else if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => { const cp = res.clone(); caches.open(VERSION).then((c) => c.put(r, cp)); return res; })));
  }
});
