const mongoose = require('mongoose')


const productSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique : true
        },
    price:{
        type:String,
        required:true
        },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    createdate:{
        type:Date,
        required:true,
        default:Date.now
    },
    updatedate:{
        type:Date,
        default:Date.now
    }
})



const Product = mongoose.model('Product', productSchema);


module.exports = Product
    
