const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Dishes = require('../models/dishes');


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
    Dishes.find({}).then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));

    
})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    Dishes.create(req.body)
    .then((dishes)=>{
        console.log('Dish Created', dishes)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err)=> next(err))
    .catch((err)=>next(err));

})

.put((req,res, next)=>{
    res.statusCode=403;
    res.end("PUT operation is not support on the dishes");
})
.delete((req,res, next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);

    })
},(err)=>next(err))




//dishID endpoints

dishRouter.route('/:dishId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dishes)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err)=>next(err))
    .catch((err)=>next(err));

 
    
})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.statusCode=403;
    res.end("POST operation is not support on the dishes :"+req.params.dishId);
})

.put((req,res, next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true})
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    })
},(err)=>next(err))

.delete((req,res, next)=>{
  Dishes.findByIdAndRemove(req.params.dishId)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);

})
},(err)=>next(err))



module.exports=dishRouter;