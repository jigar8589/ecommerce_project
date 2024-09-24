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
const schemaValidation=require("../middleware/schemaValidation")
const {createaddress}=require("../validation/validations")

addressrouter.post("/", schemaValidation(createaddress,"body"),createAddress);
addressrouter.get("/:id", authToken,getUserById);
addressrouter.delete("/:id", authToken, deleteAddressById);
addressrouter.get("/:id", authToken, getAddress);
addressrouter.patch("/:id",checkDefault);

module.exports = addressrouter;
