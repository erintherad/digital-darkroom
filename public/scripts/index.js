var originalCaman,
	filterContainer = $('#filterContainer');

$(document).ready(function() {
	$('#signInModal').on('show', 'toggle', function(event) {
	  event.preventDefault();
	  $('#email').focus();
	});
});
