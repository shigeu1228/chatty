module.exports = function(msg) {
	return msg.replace(/http.+( |$)/g, '');
};

var remove_mention = function(msg) {
	return msg.replace(/@.+( |:|$)/g, '');
};

var remove_url = function(msg) {
	return msg.replace(/http( |$)/g, '');
};
