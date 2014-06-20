var Twitter = require('twitter');
var _ = require('lodash');
var conf = require('./conf');

var twitter = new Twitter(conf.twitter);

module.exports = function(candidates) {
	var twit = _.min(candidates, 'userFollowersCount');
	twitter.retweetStatus(twit.id, function(result) {
		if (result instanceof Error) {
			console.error('Error retweeting twit', result);
			return;
		}
		console.log('Retweeted:', twit.text);
	});
};