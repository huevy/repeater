module.exports = function MediaDto(item) {
	this.id = item.id_str;
	this.src = item.media_url_https;
	this.href = item.expanded_url;
};