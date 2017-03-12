// To allow js for a single view, the file must be pre-compiled.
// Translation: if you change this, you have to restart the server
// or the changes will not take effect.

// $(document).ready(function(){
// 	$('form').submit(function(){
// 		event.preventDefault();

// 		var action = $(this).attr('action');
// 		var method = $(this).attr('method');
// 		var data = $(this).serializeArray();

// 		// debugger

// 		$.ajax({
// 			method: method,
// 			url: action,
// 			data: { data: 'something to make it happy'},
// 			dataType: 'script'
// 		});
// 	});
// });