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

	var overlay;
	Scorz.prototype = new google.maps.OverlayView();

	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {lat: 37.75, lng: -122.445}
		});

		overlay = new Scorz(map);
 		console.log('map with overlay');
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
	};

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

				// var overlay; // = new google.maps.OverlayView();
				// Scorz.prototype = new google.maps.OverlayView();
				// function initMap() {
				// 	var map = new google.maps.Map(document.getElementById('map'), {
				// 	    zoom: 11,
				// 	    center: {lat: 62.323907, lng: -150.109291},
				// 	    mapTypeId: 'satellite'
				// 	});

				// Add the container when the overlay is added to the map.
		    //     overlay.onAdd = function(){
		    //         var layer = d3.select(this.getPanes().overlayLayer)
		    //                     .append("div")
		    //                     .attr("class", "scores");
			   //      // Draw each marker as a separate SVG element.
			   //      // We could use a single SVG, but what size would it have?
			   //      overlay.draw = function() {
			   //          var projection = this.getProjection(),
			   //              padding = 12;

				  //       var marker = layer.selectAll("svg")
			   //                          .data(d3.entries(incoming))
			   //                          .each(transform) // update existing markers
			   //                          .enter().append("svg:svg")
			   //                          .each(transform)
			   //                          .attr("class", "marker")
			   //                          .each(transform)

			   //          var firstObject = Object.keys(incoming)[0];
			   //          var drugType = firstObject.description
			   //          console.log(drugType);

			   //          marker.append("svg:circle")
			   //              .attr("r", 4)
			   //              .style("fill", function(d) { return styling(drugType) })
		    //               	.style({'stroke': 'black', 'stroke-width': 0.2})
		    //               	.attr("cx", padding)
		    //              	.attr("cy", padding)

		    //             // marker.exit().remove()

						// function transform(d) {
		    //         		d = new google.maps.LatLng(d.lat, d.long);
		    //         		d = projection.fromLatLngToDivPixel(d);
		    //         		return d3.select(this)
		    //             		.style("left", (d.x - padding) + "px")
		    //             		.style("top", (d.y - padding) + "px");
	     //            	}
		    //         }
	     //      	}
		     		// overlay = new Scorz(map);
		     		// console.log("div styling");}

		     		// function Scorz(map) {
		     		// 	this.map_ = map;
		     		// 	this.div_ = null;
		     		// 	this.setMap(map)
		     		// }

		     		// Scorz.prototype.onAdd = function() {
		     		// 	var div = document.createElement('div');
		     		// 	div.style.borderStyle = 'none';
		     		// 	div.style.borderWidth = '0px';
		     		// 	div.style.position = 'absolute';
		     			

		     		// 	this.div_ = div;
		     		// };






		     	
	     		
	          	// overlay.setMap(map);
			}
		})
	})
})