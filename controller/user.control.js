const mongoose = require('mongoose')
const user = require("../model/user.model")
 require("../router/userRouter")



 async function handleUser(req,res){
    try {
      const User = new user(req.body)
      const result = await User.save()
      res.status(200).send("success")
    
     
    } catch (error) {
      console.log("error is ",error);
    }
    }
    



module.exports ={
    handleUser
}