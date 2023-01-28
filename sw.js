var CACHE_VERSION = "v5";
var CACHE = "pwa-" + CACHE_VERSION;

// Call install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            cache.addAll([
                "./index.html",
                "./main.css",
                "./main.js",
                "./sw.js"
            ])
        })
    )
});

// Call activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith("pwa-") && cacheName !== CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Call fetch event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    return caches.match("./index.html");
                }
            });
        })
    );
});

// Show an update message and reload the page
self.addEventListener("message", (event) => {
    if (!event.data) {
        return;
    }

    switch (event.data) {
        case "skipWaiting":
            self.skipWaiting();
            break;
        default:
            // NOOP
            break;
    }
});

self.addEventListener("controllerchange", () => {
    if (navigator.serviceWorker.controller) {
        if (confirm("New version available. Reload?")) {
            window.location.reload();
        }
    }
});
