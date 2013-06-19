Template.layout.isAdmin = function() {
	return Session.get('isAdmin') == true;
}

Template.layout.trackscount = function() {
	return Tracks.find({}, {sort: {slot: 1}}).count();
};
