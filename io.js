var TwitDto = require('./lib/TwitDto');
var store = require('./store');

module.exports = function(io) {
	var Stream = require('user-stream');

	var conf = require('./conf');
	var stream = new Stream(conf.twitter);
	stream.stream();

	//listen stream data
	stream.on('data', function(json) {
		if (json.text) {
			var twit = new TwitDto(json);
			store.lastTwits.push(twit);
			io.sockets.emit('twit', twit);
		}
	});
};