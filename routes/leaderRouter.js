const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
   Leaders.find({}).then((leader)=>{
       res.statusCode=200;
       res.setHeader("Content-Type",'application/json');
       res.json(leader);

   },(err)=>next(err))
   .catch((err)=>next(err))

})
.post((req,res,next)=>{
   Leaders.create(req.body)
   .then((leaders)=>{
    console.log(req.body);
    res.statusCode=200;
    res.setHeader("Content-Type",'application/json');
    res.json(leaders);

   },(err)=>next(err)).catch((err)=>next(err))

})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("PUT operation is not support on the leaders");
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Contemt-Type','appliaction/json');
        res.json(resp);
    },(err)=>next(err))
});

// EndPoints for ;eaderid


leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    Leaders.find({}).then((leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);

    },(err)=>next(err))
    .catch((err)=>next(err));


})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.statusCode=403;
    res.end("POST operation is not support on the leaders:"+req.params.leaderId);

})  

.put((req,res, next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type",'application/json');
        res.json(leader);
        
    },(err)=>next(err))
    .catch((err)=>next(err))

})

.delete((req,res, next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);

    },(err)=>next(err));
})



module.exports=leaderRouter;