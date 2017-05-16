require('dotenv').config();
const mysql = require('mysql');
const Twitter = require('twitter');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: 'utf8mb4'
});
connection.connect();
connection.query('SET NAMES utf8mb4');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const stream = client.stream('statuses/filter', {track: process.env.TRACK_WORD});
stream.on('data', function(event) {
  const tweet = {
    tweet_id: event.id_str,
    text: event.text,
    screen_name: event.user.screen_name,
    username: event.user.name
  };
  console.log(tweet);
  connection.query('INSERT INTO tweets SET ?', tweet, function (error, results, fields) {
    if (error) throw error;
  });
});
stream.on('error', function(error) {
  throw error;
});
