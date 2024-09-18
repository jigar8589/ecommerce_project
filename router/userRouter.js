const express = require("express");
const auth = require("../middlewere/auth");
const router = express.Router();

const {
  handleUser,
  getAllUser,
  resetPassword,
  handleVerification,
  loginUser,
  getUserId,
  forgotPassword,
  updateUser,
  EmailveriifyForgetAPI,AdminLogin
  
} = require("../controller/user.control");
const schemaValidator=require("../validation/schemaValidation")
const {createUser,resetpassword,updateuser}=require("../validation/validations")

router.get("/", auth, getAllUser);
router.get("/:id", auth, getUserId);
router.post("/signup",schemaValidator(createUser,"body"),handleUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", auth,schemaValidator(resetpassword,"body"),resetPassword);
router.post("/verify", handleVerification);
router.post("/login", loginUser);
router.put("/updateuser", auth, schemaValidator(updateuser,"body"),updateUser);
router.post("/sendotp", EmailveriifyForgetAPI);
router.post("/Adminlogin",AdminLogin)

module.exports = router;
