var fs = require('fs');
var _ = require("lodash");

var msg = "";
var write = function(obj, callback) {

	for (var k in obj) {
		if (obj.hasOwnProperty(k)) {
			msg += k + ":\n    [";
			var added = false;
			var tmp = {};
			for (var k2 in obj[k]) {
				if (obj[k].hasOwnProperty(k2)) {
					if (!_.has(tmp, obj[k][k2])) {
						if (added) {
							msg += ",";
						}
						msg += '"' + obj[k][k2] + '"';
						tmp[obj[k][k2]] = obj[k][k2];
						added = true;
					}
				}
			}
			msg += "]\n";
		}
	}
	callback();


};

var caller = function(obj, callback) {
	write(obj, function() {
		fs.writeFile('words_store.txt', msg , function (err) {
    		callback();
		});
	});
};
module.exports = caller;