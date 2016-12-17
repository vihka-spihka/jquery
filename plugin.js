'use strict';

$(document).ready(function() {
	
	$(document).on('click', 'ul *', function(event){
		event.stopPropagation();

		var listItem = event.target;
		var $listItem = $(this);
	
		$listItem.prependTo($('.taskList'));

	});

});