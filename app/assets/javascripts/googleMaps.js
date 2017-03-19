
// function loadScript() {
//         var script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDaEYUur-BKTCXlAYxayJbx5Scpju9Ia3M&sensor=false&callback=initialize";
//         document.body.appendChild(script);
//     }


function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}


console.log("googleMaps.js has been loaded.")

// $(document).ready(function(){
// 	// loadscript();
// 	initMap();
// })
//  class GoogleMap {
// 	 function initMap() {
// 	        var uluru = {lat: 37.75, lng: -122.445};
// 	        var map = new google.maps.Map(document.getElementById('div'), {
// 	          zoom: 13,
// 	          center: uluru
// 	        });
// 	    }

// googleMap = new GoogleMap.initMap


//////////////////////////////////////

// var map;
//     function initialize() {
//     var mapOptions = {
//         zoom: 13,
//         center: new google.maps.LatLng(37.75, -122.445)
//     };
//     map = new google.maps.Map(document.getElementById('map-canvas'),
//         mapOptions);
// }

// google.maps.event.addDomListener(window, 'load', initialize);
// google.maps.event.addDomListener(window, "zoom_changed", initialize);

