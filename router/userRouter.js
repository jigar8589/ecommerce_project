const express = require("express");
const router = express.Router();

const {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,loginUser,forgotPassword
} = require("../controller/user.control");

router.get("/", getAllUser);
router.get("/:id", getUserId);
router.post("/signup", handleUser);
router.post("/resetpassword", resetPassword);
router.post("/verify", handleVerification);
router.post("/login",loginUser)
router.post('/forgotpassword',forgotPassword)


module.exports = router;
