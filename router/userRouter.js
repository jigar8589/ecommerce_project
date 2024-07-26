const express = require("express");
const router = express.Router();

const {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,loginUser
} = require("../controller/user.control");

router.get("/", getAllUser);
router.get("/:id", getUserId);
router.post("/signup", handleUser);
router.post("/resetpassword", resetPassword);
router.post("/verify", handleVerification);
router.post("/login",loginUser)

module.exports = router;
