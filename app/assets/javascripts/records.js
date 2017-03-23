$(document).ready(function(){

	function marijuanaIsBadMkay(chosenOne){
		if (chosenOne == "drug=MARIJUANA")
			{$("#growing").toggleClass( "growth" )}
	}


	$("#drugs").change(function(event) {
		event.preventDefault();

		var theChosenOne = $("#drug").serialize();
		var theSource = $("#dealers").serialize();
		var theGrowers = $("#growers").serialize();

		marijuanaIsBadMkay(theChosenOne);

		debugger;

	})





})