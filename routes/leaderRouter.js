const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will give you the all information about Leaders');
})
.post((req,res,next)=>{
    res.end('Will add the leader '+req.body.name +' With details ' +req.body.description);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end("PUT operation is not support on the leaders");
})
.delete((req,res,next)=>{
    res.end("Deleting the leaders");

});


leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end(' will send the details of the leaders ' +req.params.leaderId+" to you");
})
.post((req,res,next)=>{      //POST request carry some data with the request in the form of JSON
    res.statusCode=403;
    res.end("POST operation is not support on the leaders")  
})  

.put((req,res, next)=>{
    res.write("This is will update leaders "+req.params.leaderId+'\n');
    res.end('Will update the leaders: '+ req.body.name + 'With details '+req.body.description);
})

.delete((req,res, next)=>{
    res.end("DELETING the leaders "+ req.params.leaderId);
})



module.exports=leaderRouter;