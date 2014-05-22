var store = require('./store');



module.exports = function(app) {
	app.get('/api/v1/twits', function(req, res) {
		res.json(store.lastTwits.items);
	});
};