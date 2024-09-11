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

router.get("/", auth, getAllUser);
router.get("/:id", auth, getUserId);
router.post("/signup", handleUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", auth, resetPassword);
router.post("/verify", handleVerification);
router.post("/login", loginUser);
router.put("/updateuser", auth, updateUser);
router.post("/sendotp", sendOtp);
router.post("/Adminlogin",AdminLogin)

module.exports = router;
