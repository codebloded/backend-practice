const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will give you the all information about Promotions');
})
.post((req,res,next)=>{
    res.end('Will add the promotions '+req.body.name +' With details ' +req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("PUT operation is not support on the promotions");
})
.delete((req,res,next)=>{
    res.end("Deleting the promotions");

});


promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end(' will send the details of the promotions ' +req.params.promoId+" to you");
})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.statusCode=403;
    res.end("POST operation is not support on the promotions")  
})  

.put((req,res, next)=>{
    res.write("This is will update the promotions "+ req.params.promoId+'\n');
    res.end('Will update the promotions : '+ req.body.name + ' With details '+req.body.description);
})

.delete((req,res, next)=>{
    res.end("Deleting  the promotions "+ req.params.promoId);
})



module.exports=promoRouter;