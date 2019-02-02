const express     = require('express');
const bodyParser = require('body-parser');

const mongoose   = require('mongoose');
const cors       = require('./cors');
const schema     = require('../models/schema');

var deviceRouter = express.Router();

deviceRouter.route('/')
.get(cors.cors, (req,res,next) => {
  schema.Devices.find({})
  .populate('lastBorrowedBy')
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
.put((req, res, next) =>{
  res.statusCode = 301;
  res.end("Put operation not supported");
})
.delete((req,res,next) => {
  res.statusCode = 301;
  res.end("Delete operation is not supported");
})

deviceRouter.route('/:deviceId')
.get(cors.cors, (req, res, next) =>{
  schema.Devices.findById(req.params.deviceId)
  .then((device) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.json(device);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) =>{
  res.statusCode = 301;
  res.end("Post operation is not available on devices/" + req.params.deviceId);
})
.put((req, res, next) =>{
  schema.Devices.findByIdAndUpdate(req.params.deviceId, { $set : req.body }, { new: true })
  .then((device) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(device);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) =>{
  schema.Devices.findByIdAndRemove(req.params.deviceId)
    .then((device) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(device);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = deviceRouter;
