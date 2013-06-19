
///////////////  SLOTS  ///////////////

Template.slots.slots = function() {
	if(Session.get('isAdmin') === true)
		return Slots.find({slot: {$gt: 2}}, {sort: {slot: 1}});
	else
		return Slots.find({}, {sort: {slot: 1}});
};

Template.slots.isAdmin = function() {
	return Session.get('isAdmin') === true;
};

Template.slots.events({
	
	'click .add-slot': function(e){

		var slotNum = 1;
		var lastSlot = Slots.findOne({}, {sort: {slot: -1}, limit: 1});

		if(Slots.find().count() > 0) {
			slotNum = lastSlot.slot + 1;
		}
		var rec = {
			slot: slotNum,
			editing: true
		}

		Slots.update({editing: true}, {$set: {editing: false}}, {multi: true});
		Slots.insert(rec);

		return false;

	}

});

Template.slot.start = function(){
	if(this.start === undefined)
		return "";
	else
		return moment.unix(this.start).format('h:mm');
}
Template.slot.end = function(){
	if(this.end === undefined)
		return "";
	else
		return moment.unix(this.end).format('h:mm');
}

Template.slot.events({

	'click .delete': function(event, template){

		if(GLOBALS.isAdmin()) {
			if(confirm('Are you sure?'))
				Slots.remove({_id: this._id}, {$set: {track: 1}});
		}

		event.stopImmediatePropagation();
		event.preventDefault();

	},

	'click .edit': function(event, template){

		Slots.update({_id: this._id}, {$set: {editing: true}})
		event.stopImmediatePropagation();
		event.preventDefault();

	},

	'click .cancel': function(event, template){

		if(GLOBALS.isAdmin()) {				

			if(this.start === undefined || this.end === undefined) {

				if(confirm('Are you sure you want to cancel?\n\nBecause the times are empty, this slot will be deleted.'))
					Slots.remove({_id: this._id}, {$set: {track: 1}});

			} else {
				Slots.update({_id: this._id}, {$set: {editing: false}});
			}
		}

		event.stopImmediatePropagation();
		event.preventDefault();

	},

	'submit': function(event, template){

		var now = moment('2012-11-03', 'YYYY-MM-DD');
		var start_field = moment($(template.find('input[name=start]')).val() + ' PM', 'h:mm A');
		var end_field = moment($(template.find('input[name=end]')).val() + ' PM', 'h:mm A');

		var start = now.clone();
		var end = now.clone();

		if(start_field.isValid() && end_field.isValid()) {

			start = start.hours(start_field.format('H'));
			start = start.minutes(start_field.format('mm'));

			end = end.hours(end_field.format('H'));
			end = end.minutes(end_field.format('mm'));
	
			Slots.update({_id: this._id}, {$set: {start: start.unix(), end: end.unix(), editing: false}});

		}

		event.stopImmediatePropagation();
		event.preventDefault();
		return false;

	}
});

Template.slot.isAdmin = function() {
	return Session.get('isAdmin') == true;
}