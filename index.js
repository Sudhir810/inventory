const mongoose = require('mongoose');
const express  = require('express');
const path     = require('path');
const logger   = require('morgan');

const mongodb = require('./models/schema');
const usersRouter = require('../routes/usersRoute');
const connect = mongoose.connect(mongodb.url)

connect.then((db) =>{
  console.log("Connected to database");
}, (err) => { console.log(err); });

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/user', usersRouter);
