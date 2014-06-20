module.exports = function TwitDto(event) {
  this.id = event.id_str;
  this.text = event.text;
  this.createdAt = new Date(event.created_at);
  this.name = event.user.name;
  this.screenName = event.user.screen_name;
  this.userName = event.user.name;
  this.userFollowersCount = event.user.followers_count;
};