$(document).ready(function() {

	var filterContainer = $('#landing-container');

	// Use the mousewheel plugin to scroll
	// scroll the div more intuitively
	filterContainer.find('ul').on('mousewheel',function(e, delta){

		this.scrollLeft -= (delta * 50);
		e.preventDefault();

	});

});
