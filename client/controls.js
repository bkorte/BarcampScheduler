Template.controls.isAdmin = function() {
	return Session.get('isAdmin') == true;
}

Template.controls.isAdding = function() {
	return Session.get('isAdding') == true;
}

Template.controls.rendered = function(){
	if(GLOBALS.isAdding())
		$('.container').addClass('adding');
	else
		$('.container').removeClass('adding');

	// $('.form input').first().focus();

};

Template.controls.talkname = function(){
	
	var talk = Talks.findOne(Session.get('talk-edit'));

	if(Session.get('talk-edit') === undefined)
		return "";
	else
		return talk.name;

}

Template.controls.description = function(){
	
	var talk = Talks.findOne(Session.get('talk-edit'));

	if(Session.get('talk-edit') === undefined)
		return "";
	else
		return talk.description;

}

Template.controls.title = function(){

	var talk = Talks.findOne(Session.get('talk-edit'));

	if(Session.get('talk-edit') === undefined)
		return "";
	else
		return talk.title;

}

Template.controls.header = function(){

	if(Session.get('talk-edit') === undefined)
		return "New Talk";
	else
		return "Edit Talk";

}

Template.controls.events({

	'click .add-talk, click .cancel-talk, click button.cancel': function(event, template) {
		Session.set('talk-edit', undefined);
		GLOBALS.toggleAdding();

		event.stopImmediatePropagation();
		event.preventDefault();
		return false;

	},

	'click .export-db': function(event, template) {
		$('.export').toggle();
		event.stopImmediatePropagation();
		event.preventDefault();
		return false;

	},

	'click button.save': function(event, template) {

		// TODO:  Add to the last slot, instead of the first.
		var rec = {
			name: $(template.find('input[name=name]')).val(),
			title: $(template.find('input[name=title]')).val(),
			description: $(template.find('textarea[name=description]')).val()
		};

		if(rec.name !== "") {

			if(Session.equals('talk-edit', undefined)) {

				var next = nextSlotAndTrack();
				rec.slot = next.slot;
				rec.track = next.track;
				Talks.insert(rec);

			} else {

				var talk = Session.get('talk-edit');
				Talks.update({_id: talk}, {$set: rec});

			}

			Session.set('isAdding', false);
			Session.set('talk-edit', undefined);
			$(template.find('input[name=name]')).val('');
			$(template.find('input[name=title]')).val('');
			$(template.find('textarea[name=description]')).val('');

		}

		event.stopImmediatePropagation();
		event.preventDefault();
		return false;

	}

});

Template.export.slots = function(){
	return Slots.find({});
}
Template.export.talks = function(){
	return Talks.find({});
}
Template.export.tracks = function(){
	return Tracks.find({});
}