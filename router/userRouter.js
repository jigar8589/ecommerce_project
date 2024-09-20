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
const schemaValidation=require("../middleware/schemaValidation")
const {createUser,resetpassword,updateuser,forgetPassword,verifyuser}=require("../validation/validations")

router.get("/", getAllUser);
router.get("/:id", authToken, getUserId);
router.post("/signup", schemaValidation(createUser,"body"),handleUser);
router.post("/resetpassword", authToken, schemaValidation(resetpassword,"body"),resetPassword);
router.post("/verify", schemaValidation(verifyuser,"query"),handleVerification);
router.post("/login", loginUser);
router.post("/forgotpassword", schemaValidation(forgetPassword,"body"),forgotPassword);
router.put("/updateuser", authToken, schemaValidation(updateuser,"body"),updateUser);
router.post("/sendotp", sendOtp);

module.exports = router;
