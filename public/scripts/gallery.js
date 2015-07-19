$(document).ready(function() {

	// Photo Template
	var photoTemplate = _.template($('#photo-template').html());
	// Photo gallery list
	var $photoList = $('#photo-gallery');
		
	var photoController = {

		// allPhotos: [],

		all: function() {
			$.get('/api/photos', function(data) {
				// Append existing post (from photos) to view
				_.each(data, function(photo, index) {
					var $photo = $(photoTemplate(photo));
					$photo.attr('data-index', index);
					$photoList.append($photo);
				});
			});
		}
	};

	photoController.all();
});
