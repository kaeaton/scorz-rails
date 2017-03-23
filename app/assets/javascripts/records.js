$(document).ready(function(){

	function marijuanaIsBadMkay(chosenOne){
		if (chosenOne === "drug=MARIJUANA")
			{$("#growing").removeClass( "hide" )}
		else
			{$("#growing").addClass( "hide" )}
	}

	function hookerBlow(hooker){
		if (hooker === "hookers=1"){
			console.log("test");
			// chosen = "drug=COCAINE";
			$("#drug").val("COCAINE");
			$("#dealers").val("1")
		}
	}



	$("#drugs").change(function(event) {
		event.preventDefault();

		var theChosenOne = $("#drug").serialize();
		var theSource = $("#dealers").serialize();
		var hookersNBlow = $("#hookers").serialize();
		var theGrowers = $("#growers").serialize();

		marijuanaIsBadMkay(theChosenOne);
		hookerBlow(hookersNBlow);

		debugger;

	})





})