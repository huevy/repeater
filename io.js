var TwitDto = require('./lib/TwitDto');
var extractMedia = require('./lib/extractMedia');
var store = require('./store');

module.exports = function(io) {
	var Stream = require('user-stream');

	var conf = require('./conf');
	var stream = new Stream(conf.twitter);
	stream.stream();

	stream.on('error', function(err) {
		console.error(err);
		process.exit(1);
	});
	//listen stream data
	stream.on('data', function(json) {
		var twit = processTwit(json);
		if (twit) {
			processMedia(json, twit);
		}
	});

	function processTwit(json) {
		if (json.text) {
			var twit = new TwitDto(json);
			io.sockets.emit('twit', twit);
			store.lastTwits.push(twit);
			store.topUsers.set(twit.screenName);
			return twit;
		}
		return null;
	}

	function processMedia(json, twit) {
		var media = extractMedia(json);
		if (media && media.length) {
			io.sockets.emit('media', {
				media: media,
				twit: twit
			});
		}
	}


};