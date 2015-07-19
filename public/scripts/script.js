$(document).ready(function() {

	// Photo Template
	var photoTemplate = _.template($('#photo-template').html());
	// Photo gallery list
	var $photoList = $('#photo-gallery');

	var photos = [
		{ imgUrl: "https://unsplash.imgix.net/photo-1432691301971-c8b920198bd7?fit=crop&fm=jpg&h=700&q=75&w=1050" },	
		{ imgUrl: "https://unsplash.imgix.net/photo-1432234525151-015bc7937f1c?fit=crop&fm=jpg&h=700&q=75&w=1050" },
		{ imgUrl: "https://ununsplash.imgix.net/photo-1433838552652-f9a46b332c40?fit=crop&fm=jpg&h=700&q=75&w=1050" },
		{ imgUrl: "https://unsplash.imgix.net/photo-1432691301971-c8b920198bd7?fit=crop&fm=jpg&h=700&q=75&w=1050" },	
		{ imgUrl: "https://unsplash.imgix.net/photo-1432234525151-015bc7937f1c?fit=crop&fm=jpg&h=700&q=75&w=1050" },
		{ imgUrl: "https://ununsplash.imgix.net/photo-1433838552652-f9a46b332c40?fit=crop&fm=jpg&h=700&q=75&w=1050" },
		{ imgUrl: "https://unsplash.imgix.net/photo-1432691301971-c8b920198bd7?fit=crop&fm=jpg&h=700&q=75&w=1050" },	
		{ imgUrl: "https://unsplash.imgix.net/photo-1432234525151-015bc7937f1c?fit=crop&fm=jpg&h=700&q=75&w=1050" },
		{ imgUrl: "https://ununsplash.imgix.net/photo-1433838552652-f9a46b332c40?fit=crop&fm=jpg&h=700&q=75&w=1050" }
		
	];

	// Append existing post (from photos) to view
	_.each(photos, function(photo, index) {
		var $photo = $(photoTemplate(photo));
		$photo.attr('data-index', index);
		$photoList.append($photo);
	});

});