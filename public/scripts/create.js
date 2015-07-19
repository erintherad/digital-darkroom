var originalCaman;

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
				text: 'text',
				author: 'author'
			},
			success: function(data) {
				// navigate to gallery
				console.log(data);
			},
			dataType: 'multipart/form-data'
		});
	});
});

