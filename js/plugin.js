'use strict';

$(document).ready(function() {
	
	var itemsCount = $('.taskList__item').length;

	var debugMode = $('input').filter('[type="checkbox"]').filter('#controlPanel__checkboxDebug');

	// Remember initial order
	var firstOrderArray = []; 
	for(let i = 0; i < itemsCount; i++) {
		
		firstOrderArray[i] = $('.taskList__item').eq(i).text();
	}

	$('.tasks__taskList').sortable();

	$('.tasks__taskList').disableSelection();;

// Event handler - click on task
	$(document).on('click', 'ul *', function(event){
		event.stopPropagation();

		var $listItemClicked = $(event.target);

		var directionChoice = $('input').filter('[name="direction"]').filter(':checked').attr('value');
		
		switch(directionChoice) {
			case 'up': $listItemClicked.upByClick(); break;
			case 'down': $listItemClicked.downByClick(); break;
			default: $listItemClicked.upByClick();
		}

		// Output current order in the console if use Debug mode
		if (debugMode.prop('checked')) {
			console.log('Debug mode: ' + $('.tasks__taskList').text());
		}
	});

// Event handler - click into Resize Button
	$('#sizeAutoBtn').on('click', function() {

		for (let i = 0; i < itemsCount; i++) {
			
			$('.taskList__item').eq(i).css('height', 'auto');
		}
	});

// Event handler - click into Resize Button to standart height
	$('#sizeStandartBtn').on('click', function() {

		for (let i = 0; i < itemsCount; i++) {
			
			$('.taskList__item').eq(i).css('height', '55');
		}
	});

// Event handler - click into Reset button (like revert() function in task)
	$('#resetBtn').on('click', function() {
			
		var itemText;

		for(let i = 0; i < itemsCount; i++) {

			$('.taskList__item').eq(i).empty();
			itemText = firstOrderArray[i];
			$('.taskList__item').eq(i).text(itemText);
		}
	});
});

// Plugin that move task up in list
(function($){
	$.fn.upByClick = function () {
		var number = $('input').filter('[type="number"]').val();

		if(this.index() > number) {
			$('.mistake').empty();
			this.addClass('moveUp');
			// this.animate({
			// 	left: 200
			// }, 800, function(){
			// 	console.log('animation up');
			// });
			this.insertBefore($('.taskList__item').eq(number));
		}
		else {
			$('.mistake').text('Вы не можете передвинуть карточку вверх на заданное место');
		}
	}
})(jQuery);

// Plugin that move task down in list
(function($){
	$.fn.downByClick = function () {
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

// Doesn`t work - crop text function
function cropText () {

	let item = $('.taskList__item').eq(2);
		text = item.text(),
		height = item.height(),
		clone = item.clone();
	
	clone.css({
			position: 'absolute',
			visibility: 'hidden',
			height: 'auto'
		});

	clone.insertAfter(item);

	var l = text.length - 1;
		for (; l >= 0 && clone.height() > height; --l) {
			clone.text(text.substring(0, l) + '...');
		}
	var cloneText = clone.text();
	console.log(cloneText)
		clone.remove();
	return cloneText;
}