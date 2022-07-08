const mongoose = require('mongoose');
const prod = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter name"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter price"]
    },
    description:{
        type:String,
        required:[true,"Please Enter description"]
    },
    category:{
        type:String,
        required:[true,"Please Enter category"]
    },
    rating :{
        type:Number,
        default:5
    },
    images:[
        {
            public_id:{
                type:String,
                required:[true,"Please insert image"]
            },
            url:{
                type:String,
                required:[true,"Please enter url"]
            }
        },
    ],
    stock:{
        type:Number,  
        default:1,
        required:true,
        maxlength:[4,"Stock cannot be greater than 9999"]
    },
    numOfReviews:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                required:true,
                ref:'User'
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }

        },
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})
module.exports = new mongoose.model('Products',prod);