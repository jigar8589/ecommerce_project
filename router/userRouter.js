const express = require("express");

const router = express.Router();

const {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,
  loginUser,
  forgotPassword,
  updateUser,
  sendOtp,
} = require("../controller/user.control");
const authToken = require("../middleware/auth");

router.get("/", getAllUser);
router.get("/:id", authToken, getUserId);
router.post("/signup", handleUser);
router.post("/resetpassword", authToken, resetPassword);
router.post("/verify", handleVerification);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.put("/updateuser", authToken, updateUser);
router.post("/sendotp", sendOtp);

module.exports = router;
