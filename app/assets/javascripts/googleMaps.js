function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: {lat: 37.75, lng: -122.445}
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}