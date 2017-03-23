$(document).ready(function(){

	function marijuanaIsBadMkay(chosenOne){
		if (chosenOne === "drug=MARIJUANA")
			{$("#growing").removeClass( "hide" )}
		else
			{$("#growing").addClass( "hide" )}
	}

	function hookerBlow(hooker){
		$("#hookers").change(function(){
			if (hooker === "hookers=1"){
				$("#drug").val("COCAINE");
				$("input[name='dealers'] :checked")
			}
		})
		

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