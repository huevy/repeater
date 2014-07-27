var TwitDto = require('./lib/TwitDto');
var extractMedia = require('./lib/extractMedia');
var store = require('./store');
var promote = require('./promote');


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

	store.promotionCandidates.on('full', onPromotionCandidatesFull);

	function processTwit(json) {
		// if (json.retweeted_status) {
		// 	console.log('SKIP: retweet');
		// 	return;
		// }
		// if (json.entities && json.entities.user_mentions && json.entities.user_mentions.length) {
		// 	console.log('SKIP: mention');
		// 	return;
		// }
		if (json.in_reply_to_status_id) {
			console.log('SKIP: in_reply_to_status_id');
			return;
		}
		if (json.in_reply_to_user_id) {
			console.log('SKIP: in_reply_to_user_id');
			return;
		}
		if (json.text) {
			var twit = new TwitDto(json);
			io.sockets.emit('twit', twit);
			store.lastTwits.push(twit);
			store.topUsers.set(twit.screenName);

			if (promote.isCharity(twit)) {
				console.log('CHARITY:', twit.screenName, twit.text);
				promote.retweet(twit);
			}
			store.promotionCandidates.push(twit);
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
			process.nextTick(function() {
				storeMedia(media, twit);
			});
		}
	}

	function storeMedia(media, twit) {
		for (var i = 0; i < media.length; i++) {
			var item = {
				photo: media[i],
				twit: twit
			};
			store.lastPhotos.push(item);
		}
		console.log(store.lastPhotos.items.length);
	}


	function onPromotionCandidatesFull(candidatesTail) {
		var candidates = candidatesTail.items;
		candidatesTail.clear();
		promote.promoteNewcomer(candidates);
	}

};