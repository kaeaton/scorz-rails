$(document).ready(function(){



		$("#drug").change(function(event) {
			event.preventDefault();

			var theChosenOne = $(this).serializeArray();

		
			$("#dealers").change(function(event){
				event.preventDefault();

				var theSource = $(this).serializeArray();

				debugger;
			})

		})





})