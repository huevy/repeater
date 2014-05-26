var Tail = require('./lib/Tail');
var Rating = require('./lib/Rating');

module.exports = {
  lastTwits: new Tail(25),
  lastPhotos: new Tail(100),
  topUsers: new Rating()
};