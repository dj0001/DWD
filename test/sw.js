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
