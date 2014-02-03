var _ = require("lodash");
var keys = require("./keys.js");

exports.create_message = function(words_store) {
	var msg = "";

	if (_.isEmpty(words_store)) {
		return msg;
	}

	var begin_candidates = words_store[keys.begin_key];
	if (begin_candidates.length == 0) {
		return msg;
	}
	var last_word = begin_candidates[Math.floor( Math.random() * begin_candidates.length )];
	msg += last_word;

	while(last_word !== keys.end_key) {
		(function(){
			var pick_candidates = words_store[last_word];
			var pick_word = pick_candidates[Math.floor( Math.random() * pick_candidates.length )];
			if (pick_word !== keys.end_key) {
				msg += pick_word;
			}
			last_word = pick_word;
		})();
	}
	return msg;
};