self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('http://www.dwd.de/DE/wetter/warnungen/warnWetter_node.html')  //https://developers.google.com/web/
  );
});
