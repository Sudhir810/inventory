const passport      = require('passport');
const localStrategy = require('passport-local').Strategy;
var User            = require('./models/UserAuth');
var JwtStrategy     = require('passport-jwt').Strategy;
var ExtractJwt      = require('passport-jwt').ExtractJwt;
var jwt             = require('jsonwebtoken');

var config          = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate));
passport.serializeUser(User.serialiseUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey    = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    function(jwt_payload, done) =>{
      console.log("JWT Payload", jwt_payload);
      User.findOne({id: jwt_payload._id}, (err,user) =>{
        if(err){
          return done(error, false );
        }else if(user){
          return done(null, user);
        }else{
          return done(null, false);
        }
      })
}));

exports.verifyUser = passport.authenticate('jwt', {session: false})
