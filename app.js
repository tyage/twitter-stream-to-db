require('dotenv').config();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
  console.log(event);
});

stream.on('error', function(error) {
  throw error;
});
