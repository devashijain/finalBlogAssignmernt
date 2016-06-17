var express = require('express');
var router = express.Router();
var imdbObj = require('node-movie');
var Movies = require('../../models/movie.js');


router.get('/',function(request,respond){
Movies.find({})
.exec(function(err,data1){
if(err){
respond.send("error has occured");
}
else {

respond.json(data1);

}
});
});




router.post('/', function(req, res) {

console.log(req.body.name);
        imdbObj(req.body.name, function (err, data) {
        if (data){
        var movie = new Movies();

        movie.Title = data.Title;
        movie.Year =  data.Year;
        movie.Rated = data.Rated;
        movie.Released = data.Released;
        movie.Runtime = data.Runtime;
        movie.Genre = data.Genre;
        movie.Director = data.Director;
        movie.Writer = data.Writer;
        movie.Actors = data.Actors;
        movie.Plot = data.Plot;
        movie.Language = data.Language;
        movie.Country = data.Country;
        movie.Awards = data.Awards;
        movie.Poster = data.Poster;
        movie.Metascore = data.Metascore;
        movie.imdbRating = data.imdbRating;
        movie.imdbVotes = data.imdbVotes;
        movie.imdbID = data.imdbID;
        movie.Type = data.Type;
        movie.Response = data.Response;
        movie.save(function(err) {
            if (err)
                res.send(err);
            res.json("Movie Added to Data-Base");
              });
            }else {
              res.send(err);
            }
            });
        });





module.exports= router;
