const CacheName = "Cache:v1"; //キャッシュの名前

//サービスワーカーを指す
self.addEventListener("install", (event) => {
  console.log("ServiceWorker install", event);
});

self.addEventListener("active", (event) => {
  console.log("ServiceWorker active", event);
});

const networkFallingBackToCache = async (request) => {
  const cache = await caches.open(CacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (err) {
    console.error(err);
    return cache.match(request);
  }
};

//イベント時に実行する処理
// ネットワークを経由してリソースを取得するためのAPI
self.addEventListener("fetch", (event) => {
  // fetchの処理が画面遷移に影響を与えていたのか
  event.respondWith(networkFallingBackToCache(event.request));
});
