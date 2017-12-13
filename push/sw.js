/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://maps.dwd.de/geoserver/dwd/wms/?REQUEST=GetFeatureInfo&SERVICE=WMS&SRS=EPSG%3A4326&STYLES=&TRANSPARENT=true&VERSION=1.1.1&FORMAT=image%2Fpng&BBOX=4.383544921875001%2C47.931066347509784%2C13.172607421875002%2C52.16045455774706&HEIGHT=600&WIDTH=800&LAYERS=dwd%3AWarnungen_Gemeinden_vereinigt&QUERY_LAYERS=dwd%3AWarnungen_Gemeinden_vereinigt&INFO_FORMAT=text%2Fjavascript&PROPERTYNAME=EVENT%2CONSET%2CEXPIRES%2CSENT&FEATURE_COUNT=50&X=392&Y=328&callback=parseResponse&_=1513179859204')  //https://developers.google.com/web/  //http://www.dwd.de/DE/wetter/warnungen/warnWetter_node.html
  );
});

//by dj
function notify() {
//console.log("Hello");  //send push
  const title = 'Push Codelab DJ';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
 }
registration.showNotification(title, options)  //ok
//ServiceWorkerRegistration.showNotification(title, options) //ko
}

//setTimeout(function(){ notify(); }, 3000)
