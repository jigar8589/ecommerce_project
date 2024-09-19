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
  sendOtp,AdminLogin
  
} = require("../controller/user.control");
const schemaValidator=require("../validation/schemaValidation")
const {createUser,resetpassword,updateuser,forgetPassword,verifyuser}=require("../validation/validations")

router.get("/", auth, getAllUser);
router.get("/:id", auth, getUserId);
router.post("/signup",schemaValidator(createUser,"body"),handleUser);
router.post("/forgotpassword",schemaValidator(forgetPassword,"body"), forgotPassword);
router.post("/resetpassword", auth,schemaValidator(resetpassword,"body"),resetPassword);
router.post("/verify", schemaValidator(verifyuser,"query"),handleVerification);
router.post("/login", loginUser);
router.put("/updateuser", auth, schemaValidator(updateuser,"body"),updateUser);
router.post("/sendotp", sendOtp);
router.post("/Adminlogin",AdminLogin)

module.exports = router;
