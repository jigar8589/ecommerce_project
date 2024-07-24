  const express = require('express')
  const router = express.Router()
  const {handleUser,getAllUser,getUserId} = require('../controller/user.control')

  

  router.get("/",getAllUser)
  router.get("/:id",getUserId)
  router.post("/signup",handleUser)



  //  router.post("/sendemail",sendmail)

  router.get("/",(req,res)=>{
    res.send("Hello World")
  })






  module.exports = router