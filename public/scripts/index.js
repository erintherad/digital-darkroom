var originalCaman,
	filterContainer = $('#filterContainer');

$(document).ready(function() {
	$('#signInModal').on('shown.bs.modal', function(event) {
		$('#email').focus();
	});
});
