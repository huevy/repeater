var Tail = require('./lib/Tail');
var Rating = require('./lib/Rating');

module.exports = {
  promotionCandidates: new Tail(4),
  lastTwits: new Tail(25),
  lastPhotos: new Tail(100),
  topUsers: new Rating()
};