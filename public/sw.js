// importScripts("https://cdnjs.cloudflare.com/ajax/libs/workbox-core/5.1.2/workbox-core.min.js");

// Registra el service worker con el navegador
self.addEventListener("install", (event) => {
    // Agrega todos los recursos de la aplicación al caché
    event.waitUntil(
        caches.open("my-cache").then((cache) => {
            cache.addAll([
                "/index.html",
                "/styles.css",
                "/scripts.js",
                "/icon-192x192.png",
                "/icon-256x256.png",
                "/icon-384x384.png",
                "/icon-512x512.png",
            ]);
        })
    );

    // Muestra la notificación de instalación
     event.waitUntil(self.registration.showNotification("Instalar aplicación en dispositivo"));
    // Muestra el cuadro de diálogo de instalación
    event.waitUntil(self.registration.prompt("¿Quieres instalar la app?"));
});

// Maneja el evento de activación del service worker
self.addEventListener("activate", (event) => {
    // Elimina los cachés antiguos
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== "my-cache") {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Maneja el evento de actualización del service worker
self.addEventListener("fetch", (event) => {
    // Devuelve el recurso del caché si está disponible
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});



