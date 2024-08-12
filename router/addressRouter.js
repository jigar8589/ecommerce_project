const express = require("express");
const addressrouter = express.Router();
const {
  createAddress,
  getUserById,
  deleteAddressById,
  getAddress,
  checkDefault,
} = require("../controller/address.control");

addressrouter.post("/", createAddress);
addressrouter.get("/:id", getUserById);
addressrouter.delete("/:id", deleteAddressById);
addressrouter.get("/:id", getAddress);
addressrouter.patch("/:id", checkDefault);

module.exports = addressrouter;
