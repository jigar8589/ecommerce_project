const mongoose = require('mongoose');
const user = require("../model/user.model");
const userService = require("../service/userService")
// require('../Util/email')



 async function handleUser(req,res){
  
  try {
      const userCreate =  await userService.manageUser(req.body)
      
      res.status(200).json({data:userCreate})
    //   if (!firstName || !lastName || !email || !phoneNo || !password) {
    //     res.status(400).send('All fields are required.');
    // }else{
    //   res.status(201).send('User registered successfully.');
    // }

  }catch(error){
    console.log(error);
  }
  

    


    //   res.status(200).json({data:userCreate})
    // } catch (error) {
    //   console.log("error is ",error);
    // }
}

module.exports={handleUser}