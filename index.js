var consumer_key = process.env.HUBOT_TWITTER_CONSUMER_KEY;
var consumer_secret = process.env.HUBOT_TWITTER_CONSUMER_SECRET;
var access_token = process.env.HUBOT_TWITTER_ACCESS_TOKEN;
var access_token_secret = process.env.HUBOT_TWITTER_ACCESS_TOKEN_SECRET;
var ts = require("tiny_segmenter-0.2");
var segmenter = new ts.TinySegmenter();     

var twitter = require('ntwitter');
var twit = new twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token,
    access_token_secret: access_token_secret
});
var segs = {};
module.exports = function(robot) {
	robot.respond(/testtest (.*)/i, function(msg){
		var today = new Date();
		console.log(msg.match[1]);

		
		seg("[定期]私はAKB48を、流行じゃなくて日本の文化にしたいです。byゆきりん");
		console.log(markov());

/*
		search('akb48', function(err, data) {
			if (err) {
				console.log(err.massage);
			} else {
				for (var i in data.statuses) {
					console.log("====");
					console.log(data.statuses[i].text);
				}
				console.log("====");
			}
		});
*/

		msg.reply(today.getDate() == 25 && (today.getMonth() + 1) == 12 ? "YES" : "NO");
	});
}

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
}

function search(q, callback) {
	var url = 'https://api.twitter.com/1.1/search/tweets.json';
	var params = {
		q: q,
		count: 3
	}
  	twit.get(url, params, callback);
}