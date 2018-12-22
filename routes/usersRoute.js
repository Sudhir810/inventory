var express      = require('express');
const bodyParser = require('body-parser');

const mongoose   = require('mongoose');
const schema     = require('../models/schema');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next) => {
  schema.Users.find({})
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) =>{
  schema.Users.create(req.body)
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) =>{
  res.statusCode = 301;
  res.end('Put opreation is not supported on /users');
})
.delete((req, res, next) =>{
  res.statusCode = 301;
  res.end('Sorry cannot remove all the users');
})

userRouter.route('/:userId')
.get((req, res, next) =>{
  schema.Users.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) =>{
  res.statusCode = 301;
  res.end("Post operation is not allowed on user/"+req.params.userId);
})
.put((req, res, next) =>{
  schema.Users.findByIdAndUpdate(req.params.userId, { $set : req.body }, { new: true })
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) =>{
  schema.Users.findByIdAndRemove(req.params.userId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = userRouter;
