module.exports = function(io) {
	var Stream = require('user-stream');

	var conf = require('./conf');
	var stream = new Stream(conf.twitter);
	stream.stream();

	//listen stream data
	stream.on('data', function(json) {
		if (json.text) {
			var twit = new TwitDto(json);
			io.sockets.emit('twit', twit);
		}
	});

};

function TwitDto(event) {
	this.text = event.text;
	this.createdAt = new Date(event.created_at);
	this.name = event.user.name;
	this.screenName = event.user.screen_name;
}