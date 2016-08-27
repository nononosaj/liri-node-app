


// Don't forget npm install request

// Load packages to use APIs for fs, Spotify, and Twitter
var fs = require('fs');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');

var action = process.argv[2];

	
// Switch case to perform different actions based on user input
switch(action){
    case 'my-tweets':
        myTweets();
    break;

    case 'spotify-this-song':
        spotifyThisSong();
    break;

    case 'movie-this':
        movieThis();
    break;

    case 'do-what-it-says':
        doWhatItSays();
    break;


    default:
    break;
}

// Twitter function for myTweets
function myTweets(){
	
	// Twitter keys in keys.js
	var keys = require('./keys.js').twitterKeys; 
	
	var client = new Twitter(keys);
	
	// Username to get tweets from / only get 20 tweets
	var params = {screen_name: 'jasonmightriot', count: 20};
	var twitTweet = " ";
	
	// NPM to get tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error) {
		for(var i = 0; i<20, i++) {
			twitTweet = tweets[i].text;
			console.log(twitTweet);
		}
	}
	// If there is an error
	else if (err) {
		console.log("Error:" + err);
		return;
	}
	});
	
}


// Spotify function
function spotifyThisSong(){
	
	//save second input
	var songName = process.argv[3];
	
	//default to "the-sign"
	if (songName == null){songName = "The-Sign";}
	
	//get data from spotify
	spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
	
	// Then log data
	console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
	console.log("Track Title: " + data.tracks.items[0].name);
	console.log("Preview Link: " + data.tracks.items[0].preview_url);
	console.log("Album Title: " + data.tracks.items[0].album.name);
	
	});
	
	//add input to log file
	fs.appendFile("log.txt", ", " + songName, function(err){
		if(err){
			return console.log(err);
		}
	});
}

function movieThis(){
	
	//save second input
	var movieName = process.argv[3];
	
	//default to "go"
	if (movieName == null){
		movieName = "go";
	}
	
	//set query
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
	
	//get data from omdb
	request(queryUrl, function (error, response, data) {

	// If the request was successful
	if (!error && response.statusCode == 200) {

		// Then log data
		console.log("\nTitle: "+JSON.parse(data)["Title"]);
		console.log("Year published: "+JSON.parse(data)["Year"]);
		console.log("IMDB Rating: "+JSON.parse(data)["imdbRating"]+"/10");
		console.log("Country where produced.: "+JSON.parse(data)["Country"]);
		console.log("Language: "+JSON.parse(data)["Language"]);
		console.log("Plot: "+JSON.parse(data)["Plot"]);
		console.log("Actors: "+JSON.parse(data)["Actors"]);
		console.log("Rotten Tomatoes Rating: "+JSON.parse(data)["tomatoUserRating"]+"/5");
		console.log("Rotten Tomatoes URL: "+JSON.parse(data)["tomatoURL"]);
	}
	});

	//load data from file
function doWhatItSays(){
	
	//get file data
	fs.readFile("random.txt", "utf8", function(err, data){

	if(err){
		return console.log(err);
	}

	//set data to second input
	process.argv[3] = data;
	
	//run spotify function
	spotifyThisSong();
	});
}
	
	//add input to log file
	fs.appendFile("log.txt", ", " + movieName, function(err){
		if(err){
			return console.log(err);
		}
	});	
}


