const express = require("express");
const router = express.Router();
const {
  handleUser,
  handleVerification,
} = require("../controller/user.control");
// const sendmail = require("../Util/email")
  const express = require('express')
<<<<<<< HEAD
  const router = express.Router()
  const {handleUser,getAllUser,getUserId,resetPassword} = require('../controller/user.control')
  const {restpassword} = require("../service/userService")

=======
  const {handleUser,getAllUser,getUserId,resetPassword} = require('../controller/user.control')
  const {restpassword} = require("../service/userService")

router.post("/signup", handleUser);
router.post("/verify", handleVerification);
>>>>>>> sagar


  router.get("/",getAllUser)
  router.get("/:id",getUserId)
  router.post("/signup",handleUser)
  router.post("/restpassword",resetPassword)



<<<<<<< HEAD
  //  router.post("/sendemail",sendmail)
=======
// router.post("/sendemail",sendmail)
  //  router.post("/sendemail",sendmail)

router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;

>>>>>>> sagar

  router.get("/",(req,res)=>{
    res.send("Hello World")
  })






  module.exports = router