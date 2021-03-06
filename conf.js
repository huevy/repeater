var conf;

if (process.env.PORT) {
  conf = {
    twitter: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  };
} else {
  conf = require('./huevy.conf.json');
}

module.exports = conf;