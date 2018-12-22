const mongoose = require('mongoose');
const express  = require('express');
const path     = require('path');
const logger   = require('morgan');
const http     = require('http');

const mongodb      = require('./models/schema');
const usersRouter  = require('./routes/usersRoute');
const deviceRouter = require('./routes/deviceRoute')
const port         = 3000;
const hostname     = 'localhost';
const connect      = mongoose.connect(mongodb.url)

connect.then((db) =>{
  console.log("Connected to database");
}, (err) => { console.log(err); });

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/users', usersRouter);
app.use('/devices',deviceRouter);

const server = http.createServer(app);
server.listen(port, hostname, () =>{
	console.log(`Server running at http://${hostname}:${port}`);
});
