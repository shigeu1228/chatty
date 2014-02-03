var ts = new require("./tiny_segmenter-0.2");
var segmenter = new ts.TinySegmenter();
var _ = require("lodash");
var keys = require("./keys.js");

exports.segment = function(words_store, msg) {
	if (_.isEmpty(msg) || msg === '') {
		return;
	}
	var words = segmenter.segment(msg);
	words.unshift(keys.begin_key);
	words.push(keys.end_key);

	for (var i = 0; i< words.length - 1; i++) {
		(function(i){
			if (words[i] !== undefined) {
				var seg = words_store[words[i]];
				if (!seg) {
					seg = [];
				}
				var next_word = words[i + 1] === keys.blank_character ? keys.end_key : words[i + 1];
				if (words[i] !== next_word) {
					seg.push(next_word);
					words_store[words[i]] = seg;
				}
			}
		})(i);
	}
};