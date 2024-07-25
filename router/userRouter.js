const express = require("express");
const router = express.Router();
const {
  handleUser,
  handleVerification,
} = require("../controller/user.control");
// const sendmail = require("../Util/email")
  const express = require('express')
  const {handleUser,getAllUser,getUserId,resetPassword} = require('../controller/user.control')
  const {restpassword} = require("../service/userService")

router.post("/signup", handleUser);
router.post("/verify", handleVerification);


  router.get("/",getAllUser)
  router.get("/:id",getUserId)
  router.post("/signup",handleUser)
  router.post("/restpassword",resetPassword)



// router.post("/sendemail",sendmail)
  //  router.post("/sendemail",sendmail)

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;


  router.get("/",(req,res)=>{
    res.send("Hello World")
  })






  module.exports = router