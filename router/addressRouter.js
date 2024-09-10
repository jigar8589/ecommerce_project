const express = require("express");
const addressrouter = express.Router();
const {
  createAddress,
  getUserById,
  deleteAddressById,
  getAddress,
  checkDefault,
} = require("../controller/address.control");
const authToken = require("../middleware/auth");

addressrouter.post("/", createAddress);
addressrouter.get("/:id", authToken, getUserById);
addressrouter.delete("/:id", authToken, deleteAddressById);
addressrouter.get("/:id", authToken, getAddress);
addressrouter.patch("/:id", checkDefault);

module.exports = addressrouter;
