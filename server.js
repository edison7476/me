var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var google = require('googleapis');
// var mongoose = require('mongoose');
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/client/')));

// Try loogin
app.use(logger('dev'));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// passport config

var Friend = require('./server/models/friendsModel.js');
passport.use(new LocalStrategy(Friend.authenticate()));
passport.serializeUser(Friend.serializeUser());
passport.deserializeUser(Friend.deserializeUser());


//require mongoose.js
require('./server/config/mongoose.js');
// require routes.js
require('./server/config/routes.js')(app);

///////////////////////////////////
// catch 404 and forward to error handler
///////////////////////////////////
  // app.use(function(req, res, next) {
  //     var err = new Error('Not Found');
  //     err.status = 404;
  //     next(err);
  // });

// error handlers

///////////////////////////////////
// development error handler
// will print stacktrace
///////////////////////////////////
  // if (app.get('env') === 'development') {
  //     app.use(function(err, req, res, next) {
  //         res.status(err.status || 500);
  //         res.render('error', {
  //             message: err.message,
  //             error: err
  //         });
  //     });
  // }

///////////////////////////////////
// production error handler
// no stacktraces leaked to user
///////////////////////////////////
  // app.use(function(err, req, res, next) {
  //     res.status(err.status || 500);
  //     res.render('error', {
  //         message: err.message,
  //         error: {}
  //     });
  // });

//require('./server/config/passport.js');

// Define error-handing middleware function
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : 'UnauthorizedError!!' + err.name + ": " + err.message});
//   }
// });
// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.status(500).send({status:500, message: 'internal error', type:'internal'});
// });

app.listen(8000, function (){
  console.log('listening on port 8000');
});
