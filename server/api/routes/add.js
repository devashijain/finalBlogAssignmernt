var express = require('express');
var router = express.Router();
var imdbObj = require('node-movie');


router.post('/', function(req, res){
console.log("inside --------------------------------");
console.log(req.body.movieName);
 imdbObj(req.body.movieName, function (err, data) {
   if (data){

      console.log(data);
     res.json(data);
   }
   else{     res.send(err);
   }
       });
           });



module.exports= router;
