const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var deviceSchema = new Schema({
  name:{
    type: String,
    unique: true,
    required: true
  },
  lastBorrowedOn: {
    type: Date
  },
  everythingIntact:{
    type: Boolean
  },
  comments:{
    type: String
  }
},{
    timestamps: true
})

var Devices = mongoose.model('Device', deviceSchema);

module.exports = Devices;
