const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    },
    password:{
        type:String,
        required:true
    }
})


const User = mongoose.model('User',userSchema);

module.exports = User