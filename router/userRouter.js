const express = require("express");
const router = express.Router();

const {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,
} = require("../controller/user.control");

router.get("/", getAllUser);
router.get("/:id", getUserId);
router.post("/signup", handleUser);
router.post("/restpassword", resetPassword);
router.post("/verify", handleVerification);

module.exports = router;
