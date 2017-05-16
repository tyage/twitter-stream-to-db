require('dotenv').config();
const mysql = require('mysql');
const Twitter = require('twitter');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
  console.log(event);

  const tweet = {
    text: event.text
  };
  connection.query('INSERT INTO tweets SET ?', tweet, function (error, results, fields) {
    if (error) throw error;
  });
});
stream.on('error', function(error) {
  throw error;
});
