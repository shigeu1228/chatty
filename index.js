var account = require("./account.js");
var twitter = require("ntwitter");
var keys = require("./lib/keys.js");
var segmenter = require("./lib/segmenter.js");
var markov = require("./lib/markov.js");
var _ = require("lodash");
var filter = require("./lib/message_filter.js");
var writer = require("./lib/writer.js");
 
var twit = new twitter({
    consumer_key: account.consumer_key,
    consumer_secret: account.consumer_secret,
    access_token_key: account.access_token,
    access_token_secret: account.access_token_secret
});

var words_store = {};

// check search word
var key_word = process.argv[2] || "";
if (_.isEmpty(key_word)) {
	return;
}

// run
search(encodeURI(key_word), function(err, result) {
	if (err) {
		console.log(err);
		return;
	}
	_(result.statuses).forEach(function(data) {
		segmenter.segment(words_store, filter(data.text));
	});
	var msg = markov.create_message(words_store);
	console.log(msg);
	if (msg.length > 140) {
		msg = msg.substring(0,139);
	}
	writer(words_store, function() {
		console.log("end");
		twit.updateStatus(msg, function(err) {
			if (err) {
				console.log(err);
			}
		});
	});

});

function search(q, callback) {
	var url = keys.twitter_search_url;
	var params = {
		q: q,
		count: 20
	}
  	twit.get(url, params, callback);
}