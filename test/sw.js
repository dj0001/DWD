//openweathermap don't work with https https://api.openweathermap.org/data/2.5/forecast/daily?q=Augsburg,de&units=metric&callback=test&lang=de&APPID=bc74c09718f9a37a61f1c58e046ac7f1
fetch('https://lh3.googleusercontent.com/iC47iekI2X1_dFpi53Lx1wx16kXjBXOI8Fo38h6hMVWU2UtuqY2V1D61QEsC1e0WQuzXkboOfg=h512-no', {mode: 'cors'})  
  .then(function(response) {  
    return response.text();  
  })  
  .then(function(text) {  
    console.log('Request successful');   //, text
  showNotification()
  })  
  .catch(function(error) {  
    console.log('Request failed', error)  
  });

self.addEventListener("push", function (event) {
  console.log("push event");

  // GET request  //don't work
  var promise = self.fetch("http://api.openweathermap.org/data/2.5/forecast/daily?q=Augsburg,de&units=metric&callback=test&lang=de&APPID=bc74c09718f9a37a61f1c58e046ac7f1")
  .then(function (res) {
    var err;
    if (res.status !== 200) {
      err = new Error(res.status);
      err.status = res.status;
      throw err;
    }

    // get response body (json)
    return res.json();
  }).then(function (data) {
    return self.registration.showNotification("????", {
      body: [
        "??: " + data.name.split("-")[0],
        "??: " + data.weather[0].main,
        "??: " + Math.round(data.main.temp - 273.15) + "?"
      ].join("\n"),
      icon: "html5.png",
      tag: "weather"
    });
  }).catch(function (err) {
    if (err.status === 404) {
      return console.log(err);
    }

    console.error(err);
  });

  // ????????????????
  event.waitUntil(promise);
});

function showNotification(tx) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! '+tx  //Buzz!
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}
