var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UserAuth = new Schema({
  name:{
    type: String,
  },
  admin:{
    type: Boolean,
    default: false
  }
});

UserAuth.plugin(passportLocalMongoose)

module.exports = mongoose.model('UserAuth', UserAuth);
