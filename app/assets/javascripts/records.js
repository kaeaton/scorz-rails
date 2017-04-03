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


	// google overlay




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

				var overlay = new googlemaps.OverlayView();
				// Add the container when the overlay is added to the map.
		        overlay.onAdd = function(){
		            var layer = d3.select(this.getPanes().overlayLayer)
		                        .append("div")
		                        .attr("class", "scores");
		        // Draw each marker as a separate SVG element.
		        // We could use a single SVG, but what size would it have?
		        overlay.draw = function() {
		            var projection = this.getProjection(),
		                padding = 12;

		        var marker = layer.selectAll("svg")
                              .data(d3.entries(incoming))
                              .each(transform) // update existing markers
                              .enter().append("svg:svg")
                              .each(transform)
                              .attr("class", "marker")
                              .each(transform)

	            var firstObject = Object.keys(ajaxResults)[0];
	            var drugType = ajaxResults[firstObject][2]
	            console.log(drugType);

	            marker.append("svg:circle")
	                .attr("r", 4)
	                .style("fill", function(d) { return styling(drugType) })
                  	.style({'stroke': 'black', 'stroke-width': 0.2})
                  	.attr("cx", padding)
                 	.attr("cy", padding)

				function transform(d) {
            		d = new google.maps.LatLng(d.value[1], d.value[0]);
            		d = projection.fromLatLngToDivPixel(d);
            		return d3.select(this)
                		.style("left", (d.x - padding) + "px")
                		.style("top", (d.y - padding) + "px");
		            }
	          	}
			}
		})
	})
})