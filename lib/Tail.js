var Tail = function Tail(capacity) {
	this._cap = capacity;
	this.items = [];
};

module.exports = Tail;

Tail.prototype.push = function(item) {
	this.items.push(item);
	if (this.items.length > this._cap) {
		this.items.shift();
	}
};