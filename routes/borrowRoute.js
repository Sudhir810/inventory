const express    = require('express');
const bodyParser = require('body-parser');

const mongoose   = require('mongoose');
const cors       = require('./cors');
var schema = require('../models/schema.js');

const borrowRouter = express.Router();

borrowRouter.route('/')
.get(cors.cors, (req, res, next) =>{
  var result;
  schema.BorrowDetails.find()
  .populate('user', 'name')
  .populate('borrow.device', 'name')
  .then((data) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  })
})
.post((req, res, next) =>{
  schema.BorrowDetails.create(req.body)
  .then((borrow) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(borrow);
  })
})
.put((req, res, next) =>{
  res.statusCode = 301;
  res.end("Put operation not allowed.");
})
.delete((req, res, next) =>{
  res.statusCode = 301;
  res.end("Delete operation currently not available");
});

borrowRouter.route('/:userId')
.get((req, res, next) => {
  schema.BorrowDetails.find({ user: req.params.userId })
  .then((details) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(details);
  })
})
.post((req, res, next) =>{
  schema.BorrowDetails.findOne({user: req.params.userId})
  .then((doc) =>{
    if(doc != null){
      doc.borrow.push(req.body.borrow[0])
      doc.save()
      .then((doc) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(doc)
      })
    }else{
      schema.BorrowDetails.create(req.body)
      .then((borrow) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(borrow);
      })
    }
  })
})
.put((req, res, next) =>{
  schema.BorrowDetails.findOne({ user: req.params.userId })
  .populate('user', 'name')
  .populate('borrow.device', 'name')
  .then((doc) =>{
    for(var i = 0; i< doc.borrow.length; i++){
      if(doc.borrow[i].device._id == req.body.borrow[0].device){
        doc.borrow[i].returned = req.body.borrow[0].returned;
      }
    }
    doc.save()
    .then((doc) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(doc);
    })
  })
})

module.exports = borrowRouter;
