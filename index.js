const mongoose     = require('mongoose');
const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const http         = require('http');
const session      = require('express-session');
const fileStore    = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

const config       = require('./config');
const mongodb      = require('./models/schema');
const usersRouter  = require('./routes/usersRoute');
const user         = require('./routes/userAuth');
const deviceRouter = require('./routes/deviceRoute');
const borrowRouter = require('./routes/borrowRoute');
const authenticate = require('./authenticate');
const config       = require('./config');

const port         = 3000;
const hostname     = 'localhost';

const connect      = mongoose.connect(config.url);
connect.then((db) =>{
  console.log("Connected to database");
}, (err) => { console.log(err); });

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cookieParser('12345-67890-12345'));
// app.use(session({
//   name:'session-id',
//   secret: '12345-67890',
//   saveUninitialized: false,
//   resave: false,
//   store: new fileStore()
// }))

app.use('/user', user);

function auth(req, res, next){
  if(!req.session.user){
    var err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }else{
    if(req.session.user === 'authenticated'){
      next();
    }else{
      var err = new Error('You are not authenticated');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);
app.use('/usersDetails', usersRouter);
app.use('/devices',deviceRouter);
app.use('/borrow', borrowRouter);

const server = http.createServer(app);
server.listen(port, hostname, () =>{
	console.log(`Server running at http://${hostname}:${port}`);
});
