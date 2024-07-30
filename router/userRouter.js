const express = require("express");
const router = express.Router();

const {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,loginUser,updateUser
} = require("../controller/user.control");
const { updateuser } = require("../service/userService");

router.get("/", getAllUser);
router.get("/:id", getUserId);
router.post("/signup", handleUser);
router.post("/resetpassword", resetPassword);
router.post("/verify", handleVerification);
router.post("/login",loginUser)
router.put("/updateuser",updateUser)


module.exports = router;
