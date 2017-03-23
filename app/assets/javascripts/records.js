$(document).ready(function(){

	function marijuanaIsBadMkay(chosenOne){
		if (chosenOne = "drug=MARIJUANA")
			{$("#growing").removeClass( "growth" )}
		else //if (chosenOne != "drug=MARIJUANA")
			{$("#growing").addClass( "growth" )}
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