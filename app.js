var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/pormoRouter');
var leaderRouter = require('./routes/leaderRouter');
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url ='mongodb://localhost:27017'
const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log("Connected  sucessfully to the Mongodb Server ...");
},(err)=>{console.log(err)});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-6789-54321-98101'));

app.use(session({
  name:'session-id',
  secret:'12345-6789-54321-98101',
  saveUninitialized:false,
  resave:false,
  store: new FileStore()

}));


function auth(req,res,next){
  console.log(req.session);
  if(!req.signedCookies.user){

    var authheader = req.headers.authorization;
    
    if(!authheader){
      var err = new Error('Your are not authenticated');
      res.setHeader('WWW-Authenticate','Basic');
      err.status=401;
      next(err);
      return;
      
      
    }
    var auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var password= auth[1];
    // const userName='rohan';
    // const pass = 'tannusingh';
    if(user==='admin' && password==='password'){
      res.cookie('user', 'admin',{signed:true})
      next();  //autherization
    }
    else{
      var err = new Error('You are not autherization');
      res.setHeader('WWW-Authenticate','Basic');
      err.status=401;
      next(err);
      
    }
  }
  else{
    if(req.signedCookies.user === 'admin'){
      next();

    }
    else{
      var err = new Error('You are not autherization');
      res.setHeader('WWW-Authenticate','Basic');
      err.status=401;
      next(err);

    }
  }
    
}
  
  app.use(auth);
  
  

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
