const express     = require('express');
const bodyParser = require('body-parser');

const mongoose   = require('mongoose');
const schema     = require('../models/schema');

var deviceRouter = express.Router();

deviceRouter.route('/')
.get((req,res,next) => {
  schema.Devices.find({})
  .then((devices) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(devices);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  schema.Devices.create(req.body)
  .then((device) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json(device);
  })
})

module.exports = deviceRouter;
