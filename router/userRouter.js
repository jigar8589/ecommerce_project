  const express = require('express')
  const router = express.Router()
  const {handleUser,getAllUser,getUserId,resetPassword} = require('../controller/user.control')
  const {restpassword} = require("../service/userService")



  router.get("/",getAllUser)
  router.get("/:id",getUserId)
  router.post("/signup",handleUser)
  router.post("/restpassword",resetPassword)



  //  router.post("/sendemail",sendmail)

  router.get("/",(req,res)=>{
    res.send("Hello World")
  })






  module.exports = router