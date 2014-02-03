var keys = require("./keys.js");
var _ = require("lodash");

module.exports = function(msg) {
	return remove_blank(remove_new_line(remove_url(remove_retweet(remove_mention(msg)))));
};

var remove_mention = function(msg) {
	if (_.isEmpty(msg)) {
		return "";
	}
	try {
		return msg.replace(/@([a-zA-Z0-9]|_)+/g, '');
	} catch(e) {
		console.log(e);
		return msg;
	}
};

var remove_url = function(msg) {
	if (_.isEmpty(msg)) {
		return "";
	}
	try {
		return msg.replace(/https?(\.|\/|[a-zA-Z0-9]|!|#|\?|=|-|&|%|:|_)+/g, '');
	} catch(e) {
		console.log(e);
		return msg;
	}
};

var remove_blank = function(msg) {
	if (_.isEmpty(msg)) {
		return "";
	}
	try {
		return msg.replace(/　/g, ' ').replace(/^ +/g, '').replace(/ +/g, ' ');
	} catch(e) {
		console.log(e);
		return msg;
	}
}

var remove_retweet = function(msg) {
	if (_.isEmpty(msg)) {
		return "";
	}
	try {
		return msg.replace(/RT ?:?/g, '').replace(/QT ?:?/g, '');
	} catch(e) {
		console.log(e);
		return msg;
	}
}

var remove_new_line = function(msg) {
	if (_.isEmpty(msg)) {
		return "";
	}
	try {
		return msg.replace(/\n/g, '');
	} catch(e) {
		console.log(e);
		return msg;
	}
}