//サービスワーカーを指す
self.addEventListener("install", (event) => {
  console.log("ServiceWorker install", event);
});

self.addEventListener("active", (event) => {
  console.log("ServiceWorker active", event);
});
