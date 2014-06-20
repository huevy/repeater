var Twitter = require('twitter');
var _ = require('lodash');
var conf = require('./conf');

var twitter = new Twitter(conf.twitter);


var reCreditCard = /\d{4}\s+\d{4}\s+\d{4}\s+\d{4}/g;
var rePrivatBank = /#ПриватБанк/gi;
var reCharity = /сбор\s+средств|собира\w+\s+средст/gi;


var retweet = exports.retweet = function(twit) {
  twitter.retweetStatus(twit.id, function(result) {
    if (result instanceof Error) {
      console.error('Error retweeting twit', result);
      return;
    }
    console.log('Retweeted:', twit.text);
  });
};

exports.promoteNewcomer = function(candidates) {
  var twit = _.min(candidates, 'userFollowersCount');
  retweet(twit);
};

exports.isCharity = function(twit) {
  var text = '' + twit.text;
  return text.match(reCharity) || text.match(rePrivatBank) || text.match(reCreditCard);
};