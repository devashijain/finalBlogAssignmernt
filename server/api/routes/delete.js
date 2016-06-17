var express = require('express');
var router = express.Router();
var imdbObj = require('node-movie');
var Movies = require('../../models/movie');


router.post('/' , function(req,res){

 var delArr=req.body.movieDeleteObj.toString().split(',');
 console.log(delArr);
delArr.map(function(data){
  Movies.remove({"_id":data},function(err){
    if(err){
      console.log(err);
    }
  })
});
res.json('Movie deleted!');
});

module.exports= router;
