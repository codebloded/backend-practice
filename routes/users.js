var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();
const User = require('../models/user');
const { route } = require('.');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Sign up Authentication For users 
router.post('/signup',(req,res,next)=>{
  User.findOne({username: req.body.username})
  .then((user)=>{
    if(user!=null){
      var err = Error('User '+req.body.username+' already exists');
      err.status = 403;
      next(err);
     }
     else{
       return User.create({
         username:req.body.username,
         password:req.body.password
       })
       
     }
  })
  .then((user)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({status:'Registration sucessfull!', user:user});

  },(err)=>next(err))
  .catch((err)=>next(err));
});


router.post('/login',(req,res,next)=>{
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
    
    User.findOne({username: req.body.username})
    .then((user)=>{
      
      if(user === null){
        var err = new Error('User '+ req.body.username + 'does not exists');

        res.setHeader('WWW-Authenticate','Basic');
        err.status=403;
        return next(err);
      }
      else if(user.password !== req.body.password){
        var err = new Error('Your password is incorrect');

        res.setHeader('WWW-Authenticate','Basic');
        err.status=403;
        return next(err);

      }
      else if(user.username === req.body.username && user.password === req.body.password){
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        res.end('You are authenticated');

        
      }
       }).catch((err)=>next(err));

    }
    else{
      res.statusCode=200;
      res.setHeader('Content-Type','text/plain');
      res.end("You are already authenticated");

    }
  
  });
  
router.get('/logout',(req,res,next)=>{
    if(req.session){
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');
      
    }
    else{
      var err = new Error('Your are not logged in');
      err.status =403;
      next(err);
    }
})



module.exports = router;
