Template.listing.slots = function() {
	return Slots.find({}, {sort: {slot: 1}});
};

Template.listingslot.slot = function() {
	return Slots.findOne({_id: this._id});
};

Template.listingslot.talks = function() {
	return Talks.find({slot: this.slot}, {sort: {track: 1}});
};

Template.listingslot.slot_number = function() {
	return this.slot;
};

Template.listingslot.slot_hidden = function() {
	if(this.hidden === undefined)
		return true;
	else
		return false;
};

Template.listingslot.slot_class = function() {
	var talks_special = Talks.find({slot: this.slot, track: -1});
	var talks_normal = Talks.find({slot: this.slot, track: {$gt: 0}});

	if(talks_special.count() > 0 && talks_normal.count() === 0)
		return "slot-special";

	return ""
};