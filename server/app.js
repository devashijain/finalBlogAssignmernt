var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var deleteMovie = require('./api/routes/delete');
var fetchMovieFromIMDB = require('./api/routes/add');
var addingMovieToDataBase =require('./api/routes/addToDatabase');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Movies = require('./models/movie.js');
var dbConfig = require('./config/config.json');

var routes = require('./api/routes/index');
var users = require('./api/routes/users');
var app = express();


//For connecting to the db
mongoose.connect(dbConfig.Config);
var db = mongoose.connection;



//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));



//Express session
app.use(session({
  secret : 'secret',
  saveUninitialized : true,
  resave : true
}));

//Passport INit
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
  errorFormatter : function(param, msg , value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return{
      param: formParam,
      msg : msg,
      value : value
    };
  }
}));

//Connect flash
app.use(flash());

//Global Vars
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})


app.use('/',routes);
app.use('/users', users);
app.use('/fetchMovieFromIMDB', fetchMovieFromIMDB);
app.use('/deleteSelectedMovie', deleteMovie);
app.use('/addingMovieToDB', addingMovieToDataBase);
app.use('/getMovieFromDb',addingMovieToDataBase)

module.exports = app;
