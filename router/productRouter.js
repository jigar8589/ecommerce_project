const express = require("express");
const productrouter = express.Router();
const {
  createProduct,
  updateproduct,
  deleteProductControl

} = require("../controller/product.control");

productrouter.post("/addproduct", createProduct);
productrouter.put("/updateproduct/:id", updateproduct);
productrouter.delete("/deleteproduct/:id", deleteProductControl);

module.exports = productrouter;
