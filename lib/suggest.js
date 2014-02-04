var http = require('http');
var _ = require("lodash");
var keys = require("./keys.js");

module.exports = function(key_word, callback) {
	if (_.isEmpty(key_word)) {
	  return "";
  }
  var q = encodeURI(key_word);
  var url = keys.google_suggest_url + q;

  http.get(url, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(str) {
      var re = /suggestion data="([^"]+)"/;
      var dataArray = re.exec(str);

      if (!dataArray) {
        callback("");
        return;
      }
      var suggestion_words = dataArray[1] || "";
      var suggestion_word = suggestion_words.split(" ");

      callback(suggestion_word[0]);
    });
  });
};