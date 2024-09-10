const mongoose = require('mongoose')
const product = require('./product.model')


const categoryShema = new mongoose.Schema({
    
    categoryName:{
        type:String,
        required:true,
        unique:true
    },
})


 const category = mongoose.model("category",categoryShema)

 module.exports = category




