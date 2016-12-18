'use strict';

$(document).ready(function() {
	
	// Remember initial order
	var firstOrderArray = []; 
	for(var i = 0; i < $('.taskList__item').length; i++) {
		
		firstOrderArray[i] = $('.taskList__item').eq(i).text();
	}
	// console.log(firstOrderArray);

	var itemsCount = $('.taskList__item').length;

	var debugMode = $('input').filter('[type="checkbox"]').filter('#controlPanel__checkboxDebug');

	$('.tasks__taskList').sortable();
	$('.tasks__taskList').disableSelection();;

	// Event handler - click on task
	$(document).on('click', 'ul *', function(event){
		event.stopPropagation();

		var $listItemClicked = $(event.target);

		var directionChoice = $('input').filter('[name="direction"]').filter(':checked').attr('value');
		
		switch(directionChoice) {
			case 'up': $listItemClicked.makeFirstByClick(); break;
			case 'down': $listItemClicked.makeLastByClick(); break;
			default: $listItemClicked.makeFirstByClick();
		}

		// Output current order in the console if use Debug mode
		if (debugMode.prop('checked')) {
			console.log('Debug mode: ' + $('.tasks__taskList').text());
		}
	});

	// Event handler - click into Reset button
	$('#resetBtn').bind('click', firstOrderArray, function() {
		$('.tasks__taskList').text(firstOrderArray.text());
	});
});

// Plugin that move task up in list
(function($){
	$.fn.makeFirstByClick = function () {
		var number = $('input').filter('[type="number"]').val();

		if(this.index() > number) {
			$('.mistake').empty();
			this.insertBefore($('.taskList__item').eq(number));
		}
		else {
			$('.mistake').text('Вы не можете передвинуть карточку вверх на заданное место');
		}
	}
})(jQuery);

// Plugin that move task down in list
(function($){
	$.fn.makeLastByClick = function () {
		var number = $('input').filter('[type="number"]').val();
		
		if(this.index() < number) {
			this.insertAfter($('.taskList__item').eq(number));
			$('.mistake').empty();
		}
		else {
			$('.mistake').text('Вы не можете передвинуть карточку вниз на заданное место');
		}
	}
})(jQuery);