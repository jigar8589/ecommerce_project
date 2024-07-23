const mongoose = require('mongoose');
const user = require("../model/user.model");
const userService = require("../service/userService")



 async function handleUser(req,res){
    try {
      const userCreate =  await userService.handlepost(req.body)
      // const User = new user(req.body)
      // const result = await User.save()
      res.status(200).json({data:userCreate})
    } catch (error) {
      console.log("error is ",error);
    }
    }
    
async function sendUseremail(req,res){
  

}


module.exports ={
    handleUser
}