$(document).ready(function() {

	// Photo Template
	var photoTemplate = _.template($('#photo-template').html());
	// Photo gallery list
	var $photoList = $('#photo-gallery');

	var photoController = {

		allPhotos: [],

		// gets all images to gallery
		all: function() {
			$.get('/api/photos', function(data) {
				allPhotos = data;
				// Append existing post (from photos) to view
				_.each(allPhotos, function(photo, index) {
					var $photo = $(photoTemplate(photo));
					$photo.attr('data-index', index);
					$photoList.append($photo);
				});
			});
		},
		getPhoto: function(id) {
			return _.findWhere(allPhotos, {_id: id});
		}
	};

	photoController.all();

	$('#photo-modal').on('show.bs.modal', function(event) {
		var anchor = $(event.relatedTarget);
		var id = anchor.attr('data-id');
		var photo = photoController.getPhoto(id);
		var modal = $(this);

		$(modal).attr('data-photo-id', id);
		modal.find('.image img').attr('src', '/photos/' + photo._id);
		modal.find('.author').val(photo.author);
		modal.find('.text').val(photo.text);
	});	

	$('.edit-pencil').on('click', function(event) {
		$('.text').addClass('edit');
		$('.modal-footer').removeClass('hidden');
	});

	$('#update-photo').on('submit', function(event) {
		event.preventDefault();

		var modal = $('#photo-modal');
		var id = $(modal).attr('data-photo-id');
		var photo = photoController.getPhoto(id);
		var updateText = modal.find('.text').val();

		photo.text = updateText;

		$.ajax({
			type: 'PUT',
			url: '/api/photos/' + id,
			data: photo,
			success: function(data) {
				$('.text').removeClass('edit');
				$('.modal-footer').addClass('hidden');	
			},
			error: function(jqXHR, textStatus, errorThrow) {
				console.log(textStatus);
			}
		});
	});
});
