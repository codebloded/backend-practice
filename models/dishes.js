const mongoose = require('mongoose');
const schema = mongoose.Schema; // initiate the schema 
mongoose.set('useFindAndModify', false);
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const commentSchema = new schema({ // making the new schema dishSchema 
    rating:{
        type:Number,
        max:5,
        min:1,
        required:true
    },
    comment:{
        type:String,
        required:true
},
    author:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
});

const dishSchema = new schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:Currency,
        required:true,
        min:0
    },
    featured:{
        type:Boolean,
        default:false
    },

    comments : [commentSchema]
},
{
    timestamps:true

},

); 


var Dishes = mongoose.model('Dish',dishSchema); // creating the models ino the mongo db database



module.exports =Dishes;
