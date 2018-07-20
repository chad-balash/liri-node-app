require("dotenv").config();
const keys = require("./keys.js");
const $ = (require('jquery'));

// Tweeter Module and Keys
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);

// Spotify Module and Keys
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);


// terminal input
let input = process.argv.slice(2);

// Variables for each value entered
let command = input[0];
let value = input[1];

// Call function to process input data
processUserData(command, value);

// Function to process data using a switch statement
function processUserData(command, value) {
    switch(command) {
        case 'my-tweets':
            tweeterCall();
            break;

        case 'spotify-this-song':
            if (value === undefined) {
                value = 'The Sign';
                spotifyCall(value);
            } else {
                spotifyCall(value);
              }
            break;

        case 'movie-this':
            omdbCall();
            break;
            
        case 'do-what-it-says':
            doWhatCall();
            break;
    }
}

// Twitter Request and return of tweets
function tweeterCall(value) {
client.get('statuses/user_timeline', {screen_name: 'BalasherB'}, function(error, tweets) {
    if(error) throw error;

    tweets.forEach(element => {
        console.log(`${'Tweet: ' + element.text}\n${'Created: ' + element.created_at}\n`);
    });
  });
}

// Spotify Request and return of music data
function spotifyCall(value) {
spotify.search({ type: 'track', query: value}, function(error, data) {
    if(error) throw error;
        console.log(`
            Artist(s): ${data.tracks.items[0].artists[0].name}
            The song's name: ${data.tracks.items[0].name}
            A preview link of the song from Spotify: ${data.tracks.items[0].preview_url}
            The album that the song is from: ${data.tracks.items[0].album.name}
        `);
  });
}