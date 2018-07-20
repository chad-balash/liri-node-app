require("dotenv").config();
const keys = require("./keys.js");
const $ = (require('jquery'));

// Tweeter Module and Keys
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);

// terminal input
let input = process.argv.slice(2);

// Variables for each arg
let command = input[0];
let data = input[1];

// Call function to processes data
processUserData(command, data);

// Function to process data
function processUserData(command, data) {
    switch(command) {
        case 'my-tweets':
        tweeterCall();
        break;
    }
}


// Twitter Request and return of tweets
function tweeterCall(data) {
client.get('statuses/user_timeline', {screen_name: 'BalasherB'}, function(error, tweets) {
    if(error) throw error;

    tweets.forEach(element => {
        console.log(`${'Tweet: ' + element.text}\n${'Created: ' + element.created_at}\n`);
    });
  });
}