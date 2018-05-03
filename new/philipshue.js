//add script at the end
//lights go on for warnings
//tested with emulator, because i don't have a bridge

warnlayer._marker.on('move', function(e){ var data=warnlayer._data
if(data.features.length) {

var bridge="http://localhost:8000/api/newdeveloper"  //edit here
var path="groups/0/action"  // lights/1/state
var bd={on:true}  // {"hue":10920,"bri":127,"sat":255}

var xhr = new XMLHttpRequest();
xhr.open("PUT", bridge+"/"+path)
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {console.log(xhr.responseText)}
xhr.send(JSON.stringify(bd))
}

})
