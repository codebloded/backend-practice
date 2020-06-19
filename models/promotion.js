const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;


const schema = mongoose.Schema;
const promoSchema = new schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:Currency,
        required:true,
        min:0
    },
    description:{
        type:String,
        requires:true
    },
    featured:{
        type:Boolean,
        required:true,
        default:false
    }
}, 

    {
        timestamps:true
}
);



var Promotion = mongoose.model('Promotion',promoSchema);

module.exports = Promotion;

