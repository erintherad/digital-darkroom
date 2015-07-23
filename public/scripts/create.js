var originalCaman,
	filterContainer = $('#filterContainer');

var tempFilePleaseToDelete;


$(document).ready(function() {
	// Dropzone.autoDiscover = false;

	// $('#fileUpload').dropzone({
	// 	url: '/not-real',
	// 	accept: function(file, done) {
	// 		var fileReader = new FileReader();

			// fileReader.onloadend = function() {
			// 	$('#edit-img').attr('src', fileReader.result);

			// 	// renders image as canvas
			// 	originalCaman = Caman('#edit-img', function () {
			// 		this.render();
			// 	});
			// }

	// 		fileReader.readAsDataURL(file);

	// 		// do not upload the file (yet)
	// 		return false;
	// 	}
	// });
	var MAX_HEIGHT = 500;
	var MAX_WIDTH  = 500;

	$('#fileUpload').fileReaderJS({
		readAsDefault: 'DataURL',
		on: {
			load: function(e, file) {
				var fileReader = new FileReader();
				
				fileReader.onloadend = function() {
					var image = new Image();

					image.onload = function() {
						var canvas = $('#edit-img')[0];
						if(image.height > image.width) {
							if(image.height > MAX_HEIGHT) {
								image.width *= MAX_HEIGHT / image.height;
								image.height = MAX_HEIGHT;
							}
						} else if(image.width > image.height) {
							if(image.width > MAX_WIDTH) {
								image.height *= MAX_WIDTH / image.width;
								image.width = MAX_WIDTH;
							}
						}
						var ctx = canvas.getContext("2d");
						canvas.width = image.width;
						canvas.height = image.height;
						ctx.drawImage(image, 0, 0, image.width, image.height);

						// renders image as canvas
						originalCaman = Caman('#edit-img', function () {
							this.render();
						});

						// $(image).remove();
					};

					image.src = fileReader.result;
				}

				fileReader.readAsDataURL(file);
			}
		}
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

