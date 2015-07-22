var originalCaman,
	filterContainer = $('#filterContainer');

$(document).ready(function() {
	// renders image as canvas
	originalCaman = Caman('#edit-img', function () {
		this.render();
	});

	$('#filters a').on('click', function(event) {
		event.preventDefault();
		
		// Sets photo back to original
		originalCaman.revert();

		// Storing id in variable
		var filterId = $(this).attr('id');

		// Based on what you clicked, run the filter if it exists
		if(typeof originalCaman[filterId] == 'function') {
			originalCaman[filterId]();
			originalCaman.render();
		}
	});

	$('#submit').on('submit', function (event) {
		event.preventDefault();
		
		// Send POST to server to create newly edited photo
		$.ajax({
			type: "POST",
			url: '/api/photos',
			data: {
				imageData: $('#edit-img')[0].toDataURL(),
				text: $('textarea[name=text]').val()
			},
			success: function(data) {
				// figure out where to send user next...
				// navigate to gallery
				alert('successfully created photo!');
			}
		});
	});

	// Use the mousewheel plugin to scroll
	// scroll the div more intuitively

	filterContainer.find('ul').on('mousewheel',function(e, delta){

		this.scrollLeft -= (delta * 50);
		e.preventDefault();

	});

	$('#signUpModal').on('shown.bs.modal', function(event) {
		$('#name').focus();
	});
});

