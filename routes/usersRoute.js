var express      = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const Users      = require('../models/schema');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  next();
})
.get((req,res,next) => {

})
.post((req, res, next) =>{

})
.put((req, res, next) =>{

})
.delete((req, res, next) =>{

})

module.exports = userRouter;
