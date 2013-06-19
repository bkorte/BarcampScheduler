
$(function(){

	GLOBALS.setWidths();
	$(document).bind('keydown.meta_shift_esc', GLOBALS.toggleAdmin);
	// $(document).bind('keydown.meta_shift_a', GLOBALS.toggleAdding);

});

GLOBALS.toggleAdmin = function() { 
	if(Session.equals('isAdmin', true))
		Session.set('isAdmin', false);
	else
		Session.set('isAdmin', true);

	Session.set('isAdding', false);
	$('.talk.shown').removeClass('shown');

	GLOBALS.setWidths();
	GLOBALS.handleDrag();

	return false;
}

GLOBALS.toggleAdding = function() { 
	if(Session.equals('isAdding', true))
		Session.set('isAdding', false);
	else
		Session.set('isAdding', true);

	return false;
}

GLOBALS.handleDrag = function() {

	if(GLOBALS.isAdmin()) {

		$('.talk').draggable({ 
			grid: [DEFAULTS.GRID, DEFAULTS.SLOT_HEIGHT], 
			containment: "parent",
			start: function() { 
				$('.schedule').addClass('dragging') 
			},
			stop: function(event, ui) {

				$('.schedule').removeClass('dragging');
				$el = $(event.target);

				$el.data('left', ui.position.left);
				$el.data('top', ui.position.top);
				$el.find('button').trigger('click');
				
			}
		});

		$('.talk.track-2').css({left: DEFAULTS.GRID+'px'});
		$('.talk.track-3').css({left: (DEFAULTS.GRID * 2)+'px'});
		$('.talk.track-4').css({left: (DEFAULTS.GRID * 3)+'px'});

	}
}

GLOBALS.isAdmin = function() {
	return Session.equals('isAdmin', true);
}

GLOBALS.isAdding = function() {
	return Session.equals('isAdding', true);
}

GLOBALS.setWidths = function() {

	var numCols = GLOBALS.isAdmin() ? 4 : 3;
	DEFAULTS.VIEWPORT = $(window).width();
	// DEFAULTS.GRID = Math.floor($(window).width() / numCols);

	// Session.set('viewport', DEFAULTS.VIEWPORT);
	// Session.set('grid', DEFAULTS.GRID);

	// $('.talk').draggable('grid', [DEFAULTS.GRID, DEFAULTS.SLOT_HEIGHT]);

	// $('head').append('<style>.talk, h2 { width: '+DEFAULTS.GRID+'px;</style>');
	// $('head').append('<style>.schedule { width: '+DEFAULTS.GRID*3+'px;</style>');

}