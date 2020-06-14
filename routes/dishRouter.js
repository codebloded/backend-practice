const express = require('express');
const bodyParser = require('body-parser');

//Declaring the dishRouter as expressRouter
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain");
    next();
})

.get((req,res,next)=>{
    res.end('will give you the all information about dishes')
})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.end('Will add the dish '+req.body.name +' With details ' +req.body.description);
})

.put((req,res, next)=>{
    res.statusCode=403;
    res.end("PUT operation is not support on the dishes");
})
.delete((req,res, next)=>{
    res.end("DELETING the dishes");
})


//dishID endpoints

dishRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end(' will send the details of the dish ' +req.params.dishId+" to you")
})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.statusCode=403;
    res.end("POST operation is not support on the dishes :"+req.params.dishId);
})

.put((req,res, next)=>{
    res.write("This is will update dish "+req.params.dishId+'\n');
    res.end('Will update the dish: '+ req.body.name + 'With details '+req.body.description);
})
.delete((req,res, next)=>{
    res.end("DELETING the dishes "+ req.params.dishId);
});

module.exports=dishRouter;