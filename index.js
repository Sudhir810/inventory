const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = "mongodb://sudhirtaneja:IknowThat1@ds231374.mlab.com:31374/inventory";
const Devices = require('./models/devices');

const connect = mongoose.connect(url, {
  useMongoClient: true
});

connect.then((db) => {
  console.log('Connected to the server')

  Devices.create({
    name: 'Asus Nexus 1',
    lastBorrowedOn: Date.now(),
    everythingIntact: true,
    comments:"Everything is in the device box."
  })
  .then((device) =>{
    return Devices.find({}).exec();
  })
  .then((devices) =>{
    console.log(devices);
    return db.collection('devices').drop();
  })
  .then(() =>{
    return db.close();
  })
  .catch((err) =>{
    console.log(err);
  })
})
