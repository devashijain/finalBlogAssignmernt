var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({

    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    Response: String


});
console.log("In the Movie.model.js file");
module.exports = mongoose.model('movies', MovieSchema, 'movies');
