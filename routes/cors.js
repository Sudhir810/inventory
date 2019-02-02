const express = require('express');
const cors    = require('cors');
var app       = express();

const whitelist = ["http://localhost:3000","https://localhost:3443"];
var corsOptionsDelegate = (req, callback) =>{
  var corsOptions;
  console.log(req.header('origin'));
  if(whitelist.indexOf(req.header('origin')) !== -1){
    corsOptions = { origin: true };
  }else{
    corsOptions = { origin: false};
  }
  callback(null, corsOptions);
}

exports.cors = cors();
exports.corsWithOption = cors(corsOptionsDelegate);
