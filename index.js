var account = require("./account.js");
var ts = new require("./lib/tiny_segmenter-0.2");
var twitter = require('ntwitter');

var segmenter = new ts.TinySegmenter();     
var twit = new twitter({
    consumer_key: account.consumer_key,
    consumer_secret: account.consumer_secret,
    access_token_key: account.access_token,
    access_token_secret: account.access_token_secret
});
var segs = {};


seg("[定期]私はAKB48を、流行じゃなくて日本の文化にしたいです。byゆきりん");

function markov() {
	var msg = "";
	var begin_candidates = segs["__begin__"];
	if (begin_candidates.length == 0) {
		return msg;
	}
	var last_word = begin_candidates[Math.floor( Math.random() * begin_candidates.length )];
	msg += last_word;

	while(last_word !== "__end__") {
		(function(){
			var pick_candidates = segs[last_word];
			var pick_word = pick_candidates[Math.floor( Math.random() * pick_candidates.length )];
			if (pick_word !== "__end__") {
				msg += pick_word;
			}
			last_word = pick_word;
		})();
	}
	return msg;
}

function seg(msg) {
	var strs = segmenter.segment(msg);
	strs.unshift("__begin__");
	strs.push("__end__");

	for (var i = 0; i< strs.length - 1; i++) {
		(function(i){
			var seg = segs[strs[i]];
			if (!seg) {
				seg = [];
			}
			seg.push(strs[i + 1]);
			segs[strs[i]] = seg;
		})(i);
	}
	console.log(segs);
}

function search(q, callback) {
	var url = 'https://api.twitter.com/1.1/search/tweets.json';
	var params = {
		q: q,
		count: 3
	}
  	twit.get(url, params, callback);
}