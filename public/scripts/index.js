var originalCaman,
	filterContainer = $('#filterContainer');

$(document).ready(function() {

	// renders image as canvas
	// originalCaman = Caman('#edit-img', function () {
	// this.render();
	// });

	// $('#filters a').on('click', function(event) {
	// 	event.preventDefault();

	// 	// Sets photo back to original
	// 	originalCaman.revert();

	// 	// Storing id in variable
	// 	var filterId = $(this).attr('id');

	// 	// Based on what you clicked, run the filter if it exists
	// 	if(typeof originalCaman[filterId] == 'function') {
	// 		originalCaman[filterId]();
	// 		originalCaman.render();
	// 	}
	// });

	// // Use the mousewheel plugin to scroll
	// // scroll the div more intuitively

	// filterContainer.find('ul').on('mousewheel',function(e, delta){

	// 	this.scrollLeft -= (delta * 50);
	// 	e.preventDefault();

	// });

	$('#signInModal').on('show', 'toggle', function(event) {
	  event.preventDefault();
	  $('#email').focus();
	});
});
