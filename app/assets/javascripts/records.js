$(document).ready(function(){

	function marijuanaIsBadMkay(chosenOne){
		if (chosenOne === "drug=MARIJUANA")
			{$("#growing").removeClass( "hide" )}
		else
			{$("#growing").addClass( "hide" )}
	}

	function hookersBlow(hooker){
		if (hooker === "hookers=1"){
			$("#drug").val("COCAINE");
			$("input[name='dealers'] :checked")
		}
	}

	function areTheHookersOut(hooker){
		hookersBlow(hooker);
		$("#hookers").change(function(event){
		// if ($("#hookers").change()){
			$("#drug").val("");
		// }

		});
		// $("#drug").change(function(event){
		// 	$("input[name='blow']").prop('checked', false);
		// });

		

	}



	$("#drugs").change(function(event) {
		event.preventDefault();

		var theChosenOne = $("#drug").serialize();
		var theSource = $("#dealers").serialize();
		var hookersNBlow = $("#hookers").serialize();
		var theGrowers = $("#growers").serialize();

		marijuanaIsBadMkay(theChosenOne);
		areTheHookersOut(hookersNBlow);

		debugger;

	})





})