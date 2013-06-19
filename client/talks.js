
Template.talks.talks = function() {
	if(Session.get('isAdmin') === true)
		return Talks.find({slot: {$gt: 2}}, {sort: {slot: 1, track: 1}});
	else
		return Talks.find({slot: {$gt: 2}}, {sort: {slot: 1, track: 1}});
};

Template.talk.track_name = function() {
	return Tracks.findOne({track: this.track}).name;
}

Template.talk.isAdmin = function() {
	return Session.get('isAdmin') == true;
}

Template.talk.track_single = function() {
	return this.track > 0
};

Template.talk.position = function() {
	var str = '';
	
	if(this.track > 0)
		str += 'left:'+((this.track-1)*DEFAULTS.GRID)+'px;';
	else
		str += 'left: 0px;'

	str += 'top:'+((this.slot-3)*DEFAULTS.SLOT_HEIGHT)+'px;';
	return str;
};

Template.talk.track_all = function() {
	return this.track == 0
};

Template.talk.track_special = function() {
	return this.track < 0
};

Template.talk.has_description = function() {
	return this.description.length > 0;
}

Template.talk.events = {

	'touchstart': function(e) {
		GLOBALS.touch = true;
	},

	'touchmove': function(e) {
		GLOBALS.touch = false;
	},

	'click, touchend': function(e, t) {
		var $el = $(e.target);
		
		if(! $el.hasClass('talk'))
			$el = $el.parent('.talk');

		if(e.type === 'touchend' && GLOBALS.touch === false)
			return false;

		if(! GLOBALS.isAdmin()) {

			if($el.find('.description').length == 0)
				return false;

			// $('.talk').not($el).removeClass('shown');

			if(! $el.hasClass('shown')) {
				$('.talk').removeClass('shown');
				$el.addClass('shown');
			} else {
				$('.talk').removeClass('shown');
			}

			e.stopImmediatePropagation();
			e.preventDefault();
			return false;
		}

	},

	// Custom events are hard.  We call this on drag stop.
	'click button': function (e) {

		var $el = $(e.target).parent();

		var left = $el.data('left');
		var top = $el.data('top');

		var track = Math.ceil((left+DEFAULTS.GRID) / DEFAULTS.GRID);
		var slot = Math.ceil((top+DEFAULTS.SLOT_HEIGHT) / DEFAULTS.SLOT_HEIGHT) + 2;

		if(this.track === 0)
			track = 0;

		Talks.update({_id: this._id}, {$set: {track: track, slot: slot}});

		if(this.track === 0)
			var overlapping = Talks.find({slot: slot, _id: {$ne: this._id}});
		else
			var overlapping = Talks.find({track: {$in: [track, 0]}, slot: slot, _id: {$ne: this._id}});

		if(overlapping != undefined) {
			overlapping.forEach(function(overlap){
				
				var next = nextSlotAndTrack();
				
				if(overlap.track === 0)
					next.track = 0;

				Talks.update({_id: overlap._id}, {$set: {track: next.track, slot: next.slot}});
			});
		}

		e.stopImmediatePropagation();
		e.preventDefault();
		return false;
	},

	'click .name': function(e) {

		if(! GLOBALS.isAdmin()) {

			var $el = $(e.target).parent('.talk');

			if($el.hasClass('shown')) {

				$('.talk').removeClass('shown');
				$('.talk').removeClass('not-shown');

			} else {

				$('.talk').removeClass('shown');
				$('.talk').removeClass('not-shown');

				$el.addClass('shown');
				$('.talk').not('.shown').addClass('not-shown');

			}

		}

	},

	'click .edit': function(e) {

		Session.set('talk-edit', this._id);
		Session.set('isAdding', true);

		e.stopImmediatePropagation();
		e.preventDefault();
		return false;

	},

	'click .expand': function(e) {
		
		if(GLOBALS.isAdmin()) {

			if(this.track > 0)
				Talks.update({_id: this._id}, {$set: {track: 0}});

			if(this.track == 0)
				Talks.update({_id: this._id}, {$set: {track: 1}});

		}

		e.stopImmediatePropagation();
		e.preventDefault();
		
	},

	'click .delete': function(e) {
		
		if(GLOBALS.isAdmin()) {

			if(confirm('Are you sure?'))
				Talks.remove({_id: this._id}, {$set: {track: 1}});

		}

		e.stopImmediatePropagation();
		e.preventDefault();

	}
}

Template.talk.rendered = function(){
	if(GLOBALS.isAdmin()) {
		GLOBALS.handleDrag();
		$('.talk').disableSelection();
	}
};
