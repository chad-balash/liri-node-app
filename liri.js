// dotenv Module to hide credentials for API's
require("dotenv").config();
// Link to key.js file
const keys = require("./keys.js");
// jQuery Module
const $ = (require('jquery'));
// jQuery Module
const request = require("request");

// Tweeter Module and Keys
let Twitter = require('twitter');
let client = new Twitter(keys.twitter);

// Spotify Module and Keys
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

// Variables for each value entered at terminal
let command = process.argv[2];
let value = process.argv[3];

// Call function to process input data
processUserData(command, value);

// Function to check which code block should execute using a switch statement
function processUserData(command, value) {
    switch(command) {
        
        case 'my-tweets':
            tweeterCall();
            break;

        case 'spotify-this-song':
            if (value === undefined) {
                spotifyCall('Ace of Base, The Sign');
            } else {
                spotifyCall(value);
              }
            break;

        case 'movie-this':
            omdbCall(value);
            break;

        case 'do-what-it-says':
            doWhatCall(value);
            break;
    }
}

// Twitter Request and return of tweets
function tweeterCall(value) {
    client.get('statuses/user_timeline', {screen_name: 'BalasherB'}, function(error, tweets) {
        if(error) throw error;

        tweets.forEach(element => {
            console.log(`
                ${'Tweet: ' + element.text}\n
                ${'Created: ' + element.created_at}\n
            `);
        });
    });
}

// Spotify Request and return of music data
function spotifyCall(value) {
    spotify.search({ type: 'track', query: value}, function(error, data) {
        if(error) throw error;
        if (data.tracks.items[0].preview_url === null) {
            console.log(`
                Artist(s): ${data.tracks.items[0].artists[0].name}
                The song's name: ${data.tracks.items[0].name}
                A preview link of the song from Spotify: 'No Preview'
                The album that the song is from: ${data.tracks.items[0].album.name}
            `);
        } else {
            console.log(`
                Artist(s): ${data.tracks.items[0].artists[0].name}
                The song's name: ${data.tracks.items[0].name}
                A preview link of the song from Spotify: ${data.tracks.items[0].preview_url}
                The album that the song is from: ${data.tracks.items[0].album.name}
            `);
        }
    });
}

// Omdb Request and return of movie data using npm request
function omdbCall(value) {
    request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=trilogy&tomatoes=true', function(error, response, body) {
        if(error) throw error;
        console.log(`
            Title of the movie: ${JSON.parse(body).Title}
            Year the movie came out: ${JSON.parse(body).Year}
            IMDB Rating of the movie: ${JSON.parse(body).imdbRating}
            Rotten Tomatoes Rating of the movie.: ${JSON.parse(body).tomatoRating}
            Country where the movie was produced: ${JSON.parse(body).Country}
            Language of the movie: ${JSON.parse(body).Language}
            Plot of the movie: ${JSON.parse(body).Plot}
            Actors in the movie: ${JSON.parse(body).Actors}
        `);
    });
}