const mongoose = require('mongoose');
const url      = "mongodb://sudhirtaneja:IknowThat1@ds231374.mlab.com:31374/inventory";
const Schema   = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  mid: {
    type: String,
    required: true,
    unique: true
  }
},{
  timestamps: true
});

var deviceSchema = new Schema({
  name:{
    type: String,
    unique: true,
    required: true
  },
  lastBorrowedOn: {
    type: Date
  },
  lastBorrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  everythingIntact:{
    type: Boolean
  },
  comments:{
    type: String
  }
},{
    timestamps: true
});

var borrowSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  borrow:[{
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device'
    },
    borrowed: Date,
    returned: Date,
  }]
},{
  timestamps: true
});

var Devices = mongoose.model('Device', deviceSchema);
var Users   = mongoose.model('User', userSchema);
var BorrowDetails = mongoose.model('BorrowDetail', borrowSchema)

module.exports = {
  Devices,
  Users,
  BorrowDetails,
  url
}
