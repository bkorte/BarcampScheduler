Template.tracknames.tracks = function() {
	return Tracks.find({}, {sort: {slot: 1}});
};

Template.tracknames.trackscount = function() {
	return Tracks.find({}, {sort: {slot: 1}}).count();
};

