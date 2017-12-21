// Änderungen für das DWD-Warnmodul2 wurden mit "// Warnmodul2:" markiert
var tID;  //timer
L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfoJsonp, this);
  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfoJsonp, this);
  },

  /* removed
  getFeatureInfo: function (evt) {
  */

  // Warnmodul2: JSONP-Version der getFeatureInfo-Funktion
  getFeatureInfoJsonp: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
        showResultsJson = L.Util.bind(this.showGetFeatureInfoJson, warnlayer);  // , this

    window.parseResponse = function(data) {
    // handle requested data from server
    showResultsJson(evt.latlng, data)
    if(data.features.length){
    var severity=["Minor","Moderate","Severe","Extreme"], warnlev=location.search.slice(1);
    if(isNaN(warnlev)?
    data.features.map(function(obj){return obj.properties.EVENT}).some(function(x){return (x == warnlev)}) :   //querystringparameter ?ereignis e.g. ?GLÄTTE
    data.features.map(function(obj){return obj.properties.SEVERITY}).some(function(x){return (severity.indexOf(x) >= warnlev)}))  //  ?warnlevel e.g. ?1
     showNotification(data.features.length)
    }
    clearTimeout(tID); tID=setTimeout(function(){L.TileLayer.BetterWMS.prototype.getFeatureInfoJsonp(evt);}, 300000)  //
};

var scriptEl = document.createElement('script');
scriptEl.setAttribute('src', url);  //url + '&callback=parseResponse'
document.head.replaceChild(scriptEl,document.getElementsByTagName("script")[0])  //document.body.appendChild(scriptEl);
//console.log(sun(evt.latlng.lat,evt.latlng.lng,new Date(),1))

window.test = function(data) {if(typeof(popup)!="undefined") popup.setContent(popup.getContent()+" "+data.main.temp+"\u00B0C")}  //console.log(data.main.temp); 
scriptEl = document.createElement('script');
scriptEl.src = "https://api.openweathermap.org/data/2.5/weather?lat="+evt.latlng.lat+"&lon="+evt.latlng.lng+"&units=metric&callback=test&lang=de&APPID=bd5e378503939ddaee76f12ad7a97608"  // forecast/daily replace APPID
document.head.replaceChild(scriptEl,document.getElementsByTagName("script")[0])  //
  },


  getFeatureInfoUrl: function (latlng) { var thise=warnlayer
    // Construct a GetFeatureInfo request URL given a point
    var point = thise._map.latLngToContainerPoint(latlng, thise._map.getZoom()),
        size = thise._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: thise.wmsParams.styles,
          transparent: thise.wmsParams.transparent,
          version: thise.wmsParams.version,      
          format: thise.wmsParams.format,
          bbox: thise._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: thise.wmsParams.layers,
          query_layers: thise.wmsParams.layers,
          info_format: 'text/javascript',
          // Warnmodul2: nur ausgewählte Properties werden abgefragt - eine ungefilterte Antwort liefert eine Vielzahl weiterer Eigenschaften der Warnungen, analog zum Inhalt im CAP-Format
          propertyName: 'EVENT,ONSET,EXPIRES,SENT,SEVERITY',  //,SEVERITY
          // Warnmodul2: FEATURE_COUNT > 1 notwendig, um im Falle überlappender Warnungen alle Warnungen abzufragen
          FEATURE_COUNT: 50
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x);  //point.x
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y);  //point.y
    
    return thise._url + L.Util.getParamString(params, thise._url, true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) {  //not used?
    if (err) { console.log(err); return; } // do nothing if there's an error
    console.log("showGetFeatureInfo: " + content);
    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  },


  // Warnmodul2: angepasste Funktion zum Aufbereiten der Geoserver-Antwort (Auswahl von bestimmten properties) und zur Anzeige als Popup
  showGetFeatureInfoJson: function (latlng, data) {
    if ( data.features[0] == null ) { return 0 };
    var content="<h2>Amtliche Warnung</h2>";
    //$.each(data.features, function (i, item) {
    data.features.forEach(function(item){
            var o = new Date(item.properties.ONSET);
            var e = new Date(item.properties.EXPIRES);
            onset = ('0' + o.getDate()).slice(-2) + '.' + ('0' + (o.getMonth()+1)).slice(-2) + ". - " + ('0' + (o.getHours())).slice(-2) + ":" + ('0' + (o.getMinutes())).slice(-2) + " Uhr";
            end = ('0' + e.getDate()).slice(-2) + '.' + ('0' + (e.getMonth()+1)).slice(-2) + ". - " + ('0' + (e.getHours())).slice(-2) + ":" + ('0' + (e.getMinutes())).slice(-2) + " Uhr" ;
            content += "<p><table><tr><td>Ereignis:</td><td><b>" + item.properties.EVENT + "</b></td></tr>";
            content += "<tr><td>Beginn:</td><td>" + onset + "</td></tr>";
            content += "<tr><td>Ende:</td><td>" + end + "</td></tr></table></p>";
            //content += "Gesendet: " + item.properties.SENT + "</p>";
    });
    content += "<a target='blank' href='https://www.dwd.de/warnungen'>www.dwd.de/warnungen</a>";
    content += "<br>"+sun(latlng.lat,latlng.lng,new Date(),1)+"\u25D2 "  //

    popup = L.popup({ maxWidth: 800})  //var 
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  }
});


L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};
