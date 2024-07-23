  const express = require('express')
  const router = express.Router()
  const {handleUser}= require('../controller/user.control')
  // const sendmail = require("../Util/email")

  router.post("/signup",handleUser)


  // router.post("/sendemail",sendmail)

  router.get("/",(req,res)=>{
    res.send("Hello World")
  })


  module.exports = router