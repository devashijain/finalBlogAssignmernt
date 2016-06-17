var express = require('express');
var router= express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/config.json');
var expressValidator = require('express-validator');
var User = require('../../models/user');

var response = {};

//Register
router.get('/register', function(req, res){

  res.render('register');
});




//Register User
router.post('/register', function(req, res){
  console.log("Inside register method is routes/user.js");
   var name = req.body.name;
   var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   var password2 = req.body.password2;
    console.log(name);
  req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
   var errors = req.validationErrors();
   if(errors)
   {
     res.render('register',{
       errors : errors
     });
   }
   else{
     var newUser = new User({
        name: name,
        email:email,
        username: username,
        password: password
     });
     User.createUser(newUser, function(err, user)
   {
     if(err) throw err

      console.log("In the else of post of register" +user);
       response= {
         user :user.username,
         msg :'User successfully registered.'
       };

     res.json(response);
   });

   }

});


//getting the username, password and validating it
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.getUserByUserName(username, function(err, user){
//       if (err) throw err;
//       if(!user)
//       {
//         return done(null, false, {message: 'Unknown User'});
//       }
//       User.comparePassword(password, user.password, function(err, isMatch){
//         if (err) throw error;
//         if(isMatch)
//         {
//           return done(null, user);
//         }
//         else {
//           return done(null, false, {message:' Invalid password'});
//         }
//
//
//       });
//       });
//
//   }
// ));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.getUserByUserById(id, function(err, user) {
//     done(err, user);
//   });
// });


//login using jwt
router.post('/login', function(req, res){
  console.log(" Post route on api/users/login invoked.");
  User.getUserByUserName(req.body.username, function(err, user){
      if(err){
        response = {
          statusCode :500,
          message: 'Fetching user failed',
          error: err
        };
        res.json(response);
      }
      else if (!user) {
          response ={
            statusCode :400,
            message: 'Login failed. User cannot be found',
            error: 'USER-DOESN\'T-EXIST'
          };
          res.send(json);
      }
      else {
        User.comparePassword(req.body.password, user.password, function(err, isMatch){
        if(isMatch && !err){
          var token =jwt.sign(user, config.secret,{
            expiresIn: 86400 //seconds
          });
          response ={
            statusCode:200,
            message: 'Authentication successful',
            user: user.username,
            token: 'JWT' +token
          };
        }  else{
            response={
              statusCode:400,
              message: 'Authentication failed. Password mismatch',
              error: 'AUTH-FAIL'
            };
        }
        res.json(response);
      });
    }
  });
});


module.exports = router;
