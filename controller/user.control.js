const mongoose = require("mongoose");
const user = require("../model/user.model");
const userService = require("../service/userService");
const User = require("../model/user.model");
// require('../Util/email')

async function handleUser(req, res) {
  try {
    const userCreate = await userService.manageUser(req.body);

    res.status(200).json({ data: userCreate });
    //   if (!firstName || !lastName || !email || !phoneNo || !password) {
    //     res.status(400).send('All fields are required.');
    // }else{
    //   res.status(201).send('User registered successfully.');
    // }
  } catch (error) {
    console.log(error);
  }

  async function sendUseremail(req, res) {}

  //   res.status(200).json({data:userCreate})
  // } catch (error) {
  //   console.log("error is ",error);
  // }
}

async function handleVerification(req, res) {
  try {
    const verifyUser = await userService.verfiyUser(req.query);
    if (verifyUser) {
      const updateUser=await user.findOneAndUpdate({_id:verifyUser._id},{isActive:true},{new:true})
      res.status(200).send({ data: updateUser});
    } else {
      res.status(404).send("user not verified");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ massage: "user not verified" });
  }
}

module.exports = { handleUser, handleVerification };
