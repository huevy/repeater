var store = require('./store');



module.exports = function(app) {

  app.get('/api/v1/twits', function(req, res) {
    res.json(store.lastTwits.items);
  });

  app.get('/api/v1/photos', function(req, res) {
    res.json(store.lastPhotos.items);
  });

  app.get('/api/v1/top', function(req, res) {
    res.json(store.topUsers.items);
  });
};