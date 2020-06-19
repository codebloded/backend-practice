const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Promotions = require('../models/promotion');


const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    Promotions.find({}).then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','appliaction/json');
        res.json(promo);
    })
},(err)=>next(err))



.post((req,res,next)=>{
    Promotions.create(req.body).then((promos)=>{
        console.log(req.body);
        res.statusCode=200;
        res.setHeader('Content-Type','appliaction/json');
        res.json(promos);
    })
    
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("PUT operation is not support on the promotions");
},(err)=>next(err))





.delete((req,res,next)=>{
    Promotions.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','appliaction/json');
        res.json(resp)
    })

},(err)=>next(err));


promoRouter.route('/:promoId')
.get((req,res,next)=>{
   Promotions.find({}).then((promos)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','appliaction/json');
    res.json(promos)
},(err)=>next(err))
.catch((err)=>next(err))
})


.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.statusCode=403;
    res.end("POST operation is not support on the promotions")  
})  

.put((req,res, next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true}).then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','appliaction/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err))

})


.delete((req,res, next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','appliaction/json');
        res.json(resp);
    })
},(err)=>next(err))




module.exports=promoRouter;