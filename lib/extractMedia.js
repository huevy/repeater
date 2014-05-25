var MediaDto = require('./MediaDto');

function extractMedia(data) {
	if (!data.entities) {
		return [];
	}
	var media = data.entities.media;
	if (!media) {
		return [];
	}
	var dataItems = [];
	for (var i = 0; i < media.length; i++) {
		var item = media[i];
		if (item.type === 'photo') {
			dataItems.push(new MediaDto(item));
		}
	}
	return dataItems;
}

module.exports = extractMedia;