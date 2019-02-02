const express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');

var User = require('../models/UserAuth');
var authenticate = require('../authenticate')
var router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.send("Respond with a resource");
})

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}),
    req.body.password, (err, user) =>{
      if(err){
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }else{
        passport.authenticate('local')(req, res, () =>{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({status: 'Registration Successful', success: true})
        })
      }
    })
})

router.post('/login', passport.authenticate('local'), (req, res, next) =>{
  var token = authenticate.getToken({_id: req.user._id})
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token, status:"Registration Successful"});


  // if(!req.session.user){
  //   var authHeader = req.headers.authorization;
  //   if(!authHeader) {
  //     var err = new Error('You are not authenticated');
  //     res.setHeader('WWW-Authenticate', 'Basic');
  //     err.status = 401;
  //     return next(err);
  //   }
  //
  //   var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  //   var username = auth[0];
  //   var password = auth[1];
  //
  //   userAuth.findOne({username: username})
  //     .then((user) =>{
  //       if(username === "admin" && password === "password"){
  //         // res.cookie('user', 'admin', {signed: true});
  //         req.session.user = 'authenticated';
  //         res.statusCode = 200;
  //         res.setHeader('Content-Type', 'text/plain');
  //         res.end("You are authenticated");
  //       }else if(user.password !== password){
  //         var err = new Error('You password is incorrect');
  //         err.status = 401;
  //         return next(err);
  //       }
  //       else if (user === null){
  //         var err = new Error('User ' + username + ' does not exists');
  //         err.status = 403;
  //         return next(err);
  //       }
  //     })
  //     .catch((err) => next(err))
  // }else{
  //   res.stautsCode = 200;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end('You are authenticated');
  // }
})

router.get('/logout', (req, res) =>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error('You are not logged in!');
    err.stauts = 403;
    next(err);
  }
})

module.exports = router;
