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
const schemaValidation=require("../validation/schemaValidation")
const {createaddress,getAddressById,makeDefault}=require("../validation/validations")

addressrouter.post("/", schemaValidation(createaddress,"body"),createAddress);
addressrouter.get("/:id", authToken, schemaValidation(getAddressById,"params"),getUserById);
addressrouter.delete("/:id", authToken, deleteAddressById);
addressrouter.get("/:id", authToken, getAddress);
addressrouter.patch("/:id", schemaValidation(makeDefault,"params"),checkDefault);

module.exports = addressrouter;
