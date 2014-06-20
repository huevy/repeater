var events = require('events');
var util = require('util');

var Tail = function Tail(capacity) {
  this._cap = capacity;
  this.items = [];
};
util.inherits(Tail, events.EventEmitter);

module.exports = Tail;

Tail.prototype.push = function(item) {
  this.items.push(item);
  var len = this.items.length;
  if (len > this._cap) {
    this.items.shift();
  }
  if (len >= this._cap) {
    this.emit('full', this);
  }
};

Tail.prototype.clear = function() {
  this.items = [];
};