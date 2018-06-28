# index_withoutmapUSA
light changes color for weather warnings  <a href="https://www.dwd.de/EN/weather/warnings/warnings_node.html#legendBox"> <img src="http://www.meteoalarm.eu/Bilder/warncolorspectrum.png" alt="ma" target="_ma" /></a>

[Metoalarm](https://meteoalarm.eu) is a web site that provides up-to-date weather warnings for most of Europe, 
[NWS](https://www.weather.gov) for most of USA

## API


| Input  | Default |Description  |
| ------------- | ------------- | -----------  |
| location| IT013         |*Country*\[[*Number*](https://meteoalarm.eu/auto/0/0/IT013.html)\]\|coordinates  |
| bridge  | http://localhost:8000/api/newdeveloper  |\[http://*ip*/api/\][*username*](https://developers.meethue.com/documentation/getting-started)  |
| light   | 1  |\[/\]*id* light\[\|sensor\]  |

location can be passed as a parameter, ?1 enable philipshue
