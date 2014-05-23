function Rating() {
  this.items = {};
}

module.exports = Rating;

Rating.prototype.set = function(key) {
  if (!this.has(key)) {
    this.items[key] = -1;
  }

  this.items[key]++;
};

Rating.prototype.has = function(key) {
  return Object.prototype.hasOwnProperty.call(this.items, key);
};