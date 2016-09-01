// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned
var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');
var passport = require('passport');
//var mandrill = require('node-mandrill')('zQsJacOYFOf6ccceVPGKEw');
// var directTransport = require('nodemailer-direct-transport');
var nodemailer = require('nodemailer');
// var options = {};
      //*** this is for nodemailer 0.7.1
var smtpTransport = nodemailer.createTransport("SMTP",{
  server: "Hotmail",
  auth:{
    user:"edison7476@Hotmail.com",
    pass:"Skyline789"
  }
});
// var smtpTransport = nodemailer.createTransport();
// var smtpTransport = nodemailer.createTransport('direct', {debug: true});
// var smtpTransport = nodemailer.createTransport(directTransport(options));
//var mail = require("nodemailer").mail;
// '<79091d4191e1bd4585481e863f830cd3-us1>'
module.exports = (function() {
    return {
        // notice how index in the factory(client side) is calling the index method(server side)
        index: function(req, res) {
            console.log('----------- Friend controller index method -----------');
            console.log('session information: ', req.session);
            Friend.find({_id:req.session.userId}, function(err, users) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(users);
                }
            });
        },
        getAllUsers: function (req, res){
          Friend.find({}, function(err, user) {
              if (err) {
                  console.log(err);
              } else {
                  res.json(user);
              }
          });
        },
        // login: function(req, res) {
        //     console.log('----------- Friend controller login method -----------');
        //     Friend.find({
        //         email: req.body.email
        //     }, function(err, user) {
        //         console.log(user[0]);
        //         console.log(req.body.password);
        //         console.log('typeof(user): ', typeof(user[0]));
        //         if (user[0] != null) { // this is not an error
        //             console.log('found the user[0].salt', user[0].salt);
        //             console.log(user[0].validPassword(req.body.password)); // return T or F
        //             if (user[0].validPassword(req.body.password)) {
        //                 console.log('successfully logged in');
        //                 console.log(user);
        //                 res.json(user);
        //             } else {
        //                 console.log('password dose NOT match our record ');
        //                 res.json({
        //                     errorMsg: 'password dose NOT match our record'
        //                 });
        //             }
        //         } else {
        //             console.log('user dose not exist');
        //             res.json({
        //                 errorMsg: 'user dose not exist'
        //             });
        //         }
        //     });
        // },

        userLogin: function (req, res){
          console.log('- controller - friends.js ----- userLogin method -----------');
          console.log('Received the following request: req.body = ', req.body);
          console.log('Received the following request: req.body.email = ', req.body.email);
          Friend.find({email: req.body.email}, function (err, user){
            if(err){
              console.log('----- error found -----');
              console.log(err);
            }
            else{
              console.log('req.session - before attached loing info', req.session);
              console.log('user = ', user);
              // console.log('user[0].firstName = ', user[0].firstName);
              req.session.userName = user[0].firstName;
              req.session.userId = user[0]._id;
              req.session.userLevel = user[0].level;
              console.log('req.session - after attached loing info', req.session);
              // res.redirect('/');

              passport.authenticate('local')(req, res, function(){
                  console.log('req.session - after attached loing info', req.session);
                res.redirect('/');
                // res.json(users);
                // res.redirect('#/ministore/products');
              });
            }
          });
        },

        logout: function (req, res){
          console.log('@*@*@* destroy the followig session dara:');
          console.log(req.session);
          console.log(req.sessionID);
          req.logout();
          req.session.destroy();
          res.redirect('/#/ministore/loginMethod');
        },
        sendEmail: function(req, res) {
            console.log(' ***  back-end controller -sendEmail function - received the following data ***');
            console.log(req.body);
            var _name = req.body.sender;
            var _senderEmail = req.body.address;
            var _subject = req.body.subject;
            var _message = req.body.message;
            console.log("senderName: "+_name+", senderEmail: "+_senderEmail+" subject: "+_subject+", message: "+_message);

            var mailOptions = {
              from:  _senderEmail,
              to: "edisonwang@edisonwang.net",
              subject: _subject,
              text: "Sender Name: "+_name +"\n"+ "Sender Email: "+_senderEmail +"\n"+_message
            };

            console.log("mailOptions: ", mailOptions);
            // mail(mailOptions);

            smtpTransport.sendMail(mailOptions, function (error, response){
              if (error) {
                    console.log(error);
                  }
                  else {
                    console.log(" messgae sent: ", response.message);
                  }
            });

            // ------------------------
            // ------ mandrill --------
            // ------------------------
            // mandrill('/messages/send', {
            //     message: {
            //         to: [{
            //             email: "edisonwang@edisonwang.com",
            //             name: "Edison"
            //         }],
            //         from_email: _senderEmail,
            //         subject: _subject,
            //         text: _message
            //     }
            // }, function(error, response) {
            //     if (error) {
            //       console.log(error);
            //     }
            //     else {
            //       console.log(response);
            //     }
            // });

            // $.ajax({
            //      type: 'POST',
            //      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            //      data: {
            //        'key': 'zQsJacOYFOf6ccceVPGKEw',
            //        'message': {
            //          'from_email': 'edisonwang@edisonwang.net',
            //          'to': [
            //              {
            //                'email': _senderEmail,
            //                'name': _name,
            //                'type': 'to'
            //              }
            //            ],
            //          'autotext': 'true',
            //          'subject': _subject,
            //          'text': _message
            //        }
            //      }
            //     })
            //     .done(function(response) {
            //       console.log(response); // if you're into that sorta thing
            //     });
        },
        // login : function(req, res){
        //   passport.authenticate('local', function(err, user, info){
        //     var token;
        //     console.log('- controller - friends.js ----- login method -----------');
        //     // If Passport throws/catches an error
        //     if (err) {
        //       console.log('- controller - friends.js -- login method -- error', err);
        //       res.status(404).json(err);
        //       return;
        //     }
        //
        //     // If a user is found
        //     if(user){
        //       console.log('- controller - friends.js -- login method -- user', user);
        //       token = user.generateJwt();
        //       res.status(200);
        //       res.json({
        //         "token" : token
        //       });
        //     } else {
        //       // If user is not found
        //       res.status(401).json(info);
        //     }
        //   })(req, res);
        // },

        addfriend: function(req, res) {
            console.log('- controller - friends.js ----- addfriend method -----------');
            console.log('Received the following request: ', req.body);
            // console.log('controller - addfriend:function - req.body.password ', req.body.password);

            var friend = new Friend({
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'email': req.body.email,
                'level':'user'
            });
            console.log('new Friend object: ', friend);

            friend.save(function (err){
              if(err){
                console.log(err);
                // return res.render("/minisotre/home", {info: "The usename already exists. Please try another username."});
              }
              else {
                req.session.userName = friend.firstName;
                req.session.userId = friend._id;
                req.session.userLevel = friend.level;
                passport.authenticate('local')(req, res, function(){
                  res.redirect('/');
                  // res.sendfile();
              });
              }
            });
            // friend.setPassword(req.body.password);
            // friend.save(function(err) {
            //     if (err) {
            //         console.log('controller responses error: ', err);
            //         res.status(500).json({
            //             errors: err.errors
            //         });
            //     } else {
            //         var token;
            //         token = friend.generateJwt();
            //         console.log('controller -- firend.js -- addfriend -- token = ', token);
            //         console.log('sending Token back to the front-end');
            //         res.status(200);
            //         res.json({
            //             "token": token
            //         });
            //     }
            // });
        },

        removefriend: function(req, res) {
            console.log('---friends.js ----- controller removefriend method -----------');
            console.log(req.body);
            Friend.remove({
                _id: req.body._id
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        }

    }; // end of return
})(); // end of module.exports = function ()
