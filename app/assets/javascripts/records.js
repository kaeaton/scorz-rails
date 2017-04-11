$(document).ready(function(){

	// Marker styling

	function styling(drugType){
	    switch(drugType){
	        case "MARIJUANA":
		        console.log("switch")
		        return "rgba(74, 145, 48, 0.3)";
		        break;
	        case "PIMPING":
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

	var testData = [
{category: "PROSTITUTION",
datetime: "2017-01-02T00:00:00.000Z",
day_of_week: "Monday",
description: "PIMPING",
district: "SOUTHERN",
full_description: "PIMPING",
id: 29,
lat: "37.7727234013654",
long: "-122.410416664036",
popo_id: "170002906",
sale: true},
{category: "PROSTITUTION",
datetime: "2017-02-20T00:00:00.000Z",
day_of_week: "Monday",
description: "PIMPING",
district: "TARAVAL",
full_description: "PIMPING",
id: 249,
lat: "37.7236442721138",
long: "-122.454598859175",
popo_id: "170145982",
sale: true}
]

	var overlay;
	Scorz.prototype = new google.maps.OverlayView();

	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: {lat: 37.75, lng: -122.445}
		});

		overlay = new Scorz(map);
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

	Scorz.prototype.draw = function() {
		var projection = this.getProjection();
		var div = this.div_;
		var padding = 12;
		console.log(testData);

		var firstObject = Object.keys(testData)[0];
		var drugType = testData[firstObject].description;
		// var coordinates = {["coordinates"]: [testData[firstObject].long, testData[firstObject]lat]};
		console.log(firstObject);
		console.log(drugType);
		// console.log(coordinates);

		var marker = d3.select('#map')
							.selectAll('svg')
							.data([-122.410416664036, -122.454598859175], function(d){return d;})
							// .data(testData)
							// // .each(transform)
							.enter().append('svg:svg')
							// // .each(transform)
							.attr('class', 'marker')
							// // .each(transform)
							// .attr('x')
							// .attr('y')

		console.log(marker);

		// var firstObject = Object.keys(testData)[0];
		// var drugType = testData[firstObject].description;
		// console.log(firstObject);
		// console.log(drugType);

		marker.enter().append("circle")
                .attr("r", 4)
                .style("fill", function(d) { return styling(drugType) })
                .style('stroke', 'black') 
                .style('stroke-width', 0.2)
                .attr("cx", function(d) {return d;})//padding)
                .attr("cy", 37.7727234013654) //padding)
	}

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
			success: function(ajaxResults){
				console.log(ajaxResults);
				console.log(ajaxResults[0].description)

				// var overlay;
				// Scorz.prototype = new google.maps.OverlayView();

				// function initMap() {
				// 	// var map = new google.maps.Map(document.getElementById('map'), {
				// 	// 	zoom: 13,
				// 	// 	center: {lat: 37.75, lng: -122.445}
				// 	// });

				// 	// overlay = new Scorz(map);
				// 	overlay = new Scorz(map);
			 // 		console.log('map');
			 // 	}

				// function Scorz(map) {
				// 	this.map_ = map
				// 	this.div_ = null

				// 	this.setMap(map)
				// }

				// Scorz.prototype.onAdd = function() {
				// 	// var div = document.createElement('div');
				// 	// div.style.borderStyle = 'none';
				// 	// div.style.borderWidth = '0px';
				// 	// div.style.position = 'absolute';

				// 	var layer = d3.select(this.getPanes().overlayLayer)
			 //                        .append("div")
			 //                        .attr("class", "scores");

			 //        overlay.draw = function() {
			 //            var projection = this.getProjection(),
			 //                padding = 12;

			 //            var marker = layer.selectAll("svg")
			 //                              .data(d3.entries(ajaxResults))
			 //                              .each(transform) // update existing markers
			 //                              .enter().append("svg:svg")
			 //                              .each(transform)
			 //                              .attr("class", "marker")
			 //                              .each(transform)


			 //            var firstObject = Object.keys(ajaxResults)[0];
			 //            var drugType = ajaxResults[firstObject][2]
			 //            console.log(drugType);

			 //            marker.append("svg:circle")
			 //            		.attr("r", 4)
			 //            		.style("fill", function(d) {return styling(drugType)})
			 //            		.style({"stroke": "black", "stroke-width": 0.2})
			 //            		.attr("cx", padding)
			 //            		.attr("cy", padding)

			 //            function transform(d) {
				//             d = new google.maps.LatLng(d.value[1], d.value[0]);
				//             d = projection.fromLatLngToDivPixel(d);
				//             return d3.select(this)
				//                 .style("left", (d.x - padding) + "px")
				//                 .style("top", (d.y - padding) + "px");
				//             }
				//         }

				// 	this.div_ = div

				// 	var panes = this.getPanes();
				// 	panes.overlayLayer.appendChild(div);
				// 	console.log('map overlay')
				// };

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


				// google.maps.event.addDomListener(window, 'load', initMap);


			}
		})
	})
})