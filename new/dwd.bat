Rem DWD-Warnmodul (win10 1803) time in UTC
@echo off
set /p lat="Enter lat(48.37) " ||set lat=48.37
set /p lon="Enter lon(10.90) " ||set lon=10.90
curl "https://maps.dwd.de/geoserver/dwd/wms/?request=GetFeatureInfo&service=WMS&srs=EPSG%%3A4326&styles=&transparent=true&version=1.1.1&format=image%%2Fpng&bbox=%lon%%%2C%lat%%%2C%lon%1%%2C%lat%1&height=1&width=1&layers=Warnungen_Gemeinden_vereinigt&query_layers=Warnungen_Gemeinden_vereinigt&info_format=text%%2Fplain&propertyName=EVENT%%2CONSET%%2CEXPIRES%%2CSENT%%2CSEVERITY%%2CEC_GROUP%%2CSENT&FEATURE_COUNT=50&x=0&y=0"
pause
