const mongoose = require('mongoose');

//initiate the Schema with mongoose 
const schema = mongoose.Schema;

const leaderSchema = new schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    abbr:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    }


})
var Leaders = mongoose.model('Leader',leaderSchema)

module.exports = Leaders;