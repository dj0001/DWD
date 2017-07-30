var endpoint;

// Register a Service Worker.
navigator.serviceWorker.register('sw_pa.js')  //service-worker.js
.then(function(registration) {
  // Use the PushManager to get the user's subscription to the push service.
  return registration.pushManager.getSubscription()
  .then(function(subscription) {
    // If a subscription was found, return it.
    if (subscription) {
      return subscription;
    }

    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).
    return registration.pushManager.subscribe({ userVisibleOnly: true });
  });
}).then(function(subscription) {
  endpoint = subscription.endpoint;

  // Show curl command to send the notification on the page.
  document.getElementById('curl').textContent = 'curl -H "TTL: 60" -X POST ' + endpoint;

  // Send the subscription details to the server using the Fetch API.
  fetch('./register', {  //  need endpoint?!!!
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
    }),
  });
});

document.getElementById('doIt').onclick = function() {
  var delay = document.getElementById('notification-delay').value;
  var ttl = document.getElementById('notification-ttl').value;

  // Ask the server to send the client a notification.
  // This is for testing purposes, in a real application the notifications will be
  // directly generated by the server without the user asking for it (otherwise, what
  // would be the point?).
  fetch('./sendNotification?endpoint=' + endpoint + '&delay=' + delay +
        '&ttl=' + ttl,
    {
      method: 'post',
    }
  );
};
