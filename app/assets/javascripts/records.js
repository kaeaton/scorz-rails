$(document).ready(function(){

	// Marker styling

	function styling(drugType){
	    switch(drugType){
	        case "MARIJUANA":
		        console.log("switch")
		        return "rgba(74, 145, 48, 0.3)";
		        break;
	        case "COCAINE":
		        return "rgba(255, 0, 0, 0.3)";
		        break;
	        case "METH-AMPHETAMINE":
		        return "rgba(0, 0, 255, 0.3)";
		        break;
	        case "HEROIN":
		        return "rgba(100, 16, 16, 0.3)";
		        break;
	        case "HALLUCINOGENIC":
		        return "rgba(0, 0, 0, 0.3)"
		        break;
	        case "OPIATES":
		        return "rgba(72, 0, 32, 0.7)"
		        break;
	        default:
		        return "rgba(72, 0, 32, 0.3)";
	    }
	}

	// Bring forth the map

	// var overlay;
	// Scorz.prototype = new google.maps.OverlayView();

	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {lat: 37.75, lng: -122.445}
		});

	// 	// overlay = new Scorz(map);
 // 		console.log('map');
 	}

	// function Scorz(map) {
	// 	this.map_ = map
	// 	this.div_ = null

	// 	this.setMap(map)
	// }

	// Scorz.prototype.onAdd = function() {
	// 	var div = document.createElement('div');
	// 	div.style.borderStyle = 'none';
	// 	div.style.borderWidth = '0px';
	// 	div.style.position = 'absolute';

	// 	this.div_ = div

	// 	var panes = this.getPanes();
	// 	panes.overlayLayer.appendChild(div);
	// 	console.log('map overlay')
	// };

	google.maps.event.addDomListener(window, 'load', initMap);


	// Dropdown and checkbox functions

	function marijuanaIsBadMkay(chosenOne){
		if (chosenOne === "drug=MARIJUANA")
			{$("#growing").removeClass( "hide" )}
		else
			{$("#growing").addClass( "hide" )}
	}

	function hookersBlow(hooker){
		if (hooker === "hookers=1"){
			$("#drug").val("COCAINE");
			$("input#dealers").prop('checked', true);
		} 
	}

	function areTheHookersOut(hooker){
		hookersBlow(hooker);
		$("#hookers").change(function(event){
			$("#drug").val("");
			$("input#dealers").prop('checked', false);
		});
	}

	$("#drugs").change(function(event) {
		event.preventDefault();

		var theChosenOne = $("#drug").serialize();
		var theSource = $("#dealers").serialize();
		var hookersNBlow = $("#hookers").serialize();
		var theGrowers = $("#growers").serialize();

		marijuanaIsBadMkay(theChosenOne);
		areTheHookersOut(hookersNBlow);


		var formData = theChosenOne + "&" + theSource + "&" + hookersNBlow + "&" + theGrowers
		// debugger;

		$.ajax({
			type: "GET",
			url: "locations",
			dataType: "json",
			data: formData,
			success: function(incoming){
				console.log(incoming);
				console.log(incoming[0].description)

				var overlay;
				Scorz.prototype = new google.maps.OverlayView();

				function initMap() {
					var map = new google.maps.Map(document.getElementById('map'), {
						zoom: 13,
						center: {lat: 37.75, lng: -122.445}
					});

					// overlay = new Scorz(map);
			 		console.log('map');
			 	}

				function Scorz(map) {
					this.map_ = map
					this.div_ = null

					this.setMap(map)
				}

				Scorz.prototype.onAdd = function() {
					var div = document.createElement('div');
					div.style.borderStyle = 'none';
					div.style.borderWidth = '0px';
					div.style.position = 'absolute';

					this.div_ = div

					var panes = this.getPanes();
					panes.overlayLayer.appendChild(div);
					console.log('map overlay')
				};

				// google.maps.event.addDomListener(window, 'load', initMap);


				// var layer = d3.select(this.getPanes().overlayLayer)
				// 			.append('div')
				// 			.attr('class', 'scores');

				// Draw each marker as a separate SVG element

				// var overlay;
				// Scorz.prototype = new google.maps.OverlayView();

				// function initMap() {

				// }


				// overlay.draw = function(){
				// 	var projection = this.getProjection(),
				// 		padding = 12;

				// 	var marker = layer.selectAll('svg')
				// 						.data(d3.entries(incoming))
				// 						.each(transform) //update existing markers
				// 						.enter().append('svg:svg')
				// 						.each(transform)
				// 						.attr('class', 'marker')
				// 						.each(transform)

				// 	var firstObject = Object.keys(incoming)[0];
				// 	console.log(firstObject)
				// }




			}
		})
	})
})