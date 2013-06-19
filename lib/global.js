var DEFAULTS = {
	SUPPER_SLOT: 8,
	NUM_TRACKS: 3,
	MIN_SLOTS: 10,
	SLOT_HEIGHT: 125,
	GRID: 305
}

var GLOBALS = {};

function nextSlotAndTrack() {

	var last = {
		slot: 1,
		track: 1
	}
	var curSeeking = true;

	while(curSeeking) {

		var talk = Talks.findOne({slot: last.slot, track: {$in: [last.track, 0, -1]}});
		console.log(talk);
		if(talk === undefined) {

			curSeeking = false;

		} else {

			if(last.track === DEFAULTS.NUM_TRACKS || talk.track < 1) {
				last.track = 1;
				last.slot++;
			} else {
				last.track++;
			}

		}
	};

	if(last.track > DEFAULTS.NUM_TRACKS) {
		last.track = 1;
		last.slot++;
	}

	return last;
}

function timeMachine() {
	var now = moment('2012-11-03 13:45', 'YYYY-MM-DD HH:mm').unix();
	var past = Slots.update({end: {$lt: now}}, {$set: {hidden:false}});
	setTimeout(timeMachine, 2000);
}