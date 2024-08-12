const express = require("express");
const productrouter = express.Router();
const {
  createProduct,
  updateproduct,
  deleteProductControl,
  allProducts,
  getProductcontroler,
} = require("../controller/product.control");

productrouter.post("/", createProduct);
productrouter.put("/:id", updateproduct);
productrouter.delete("/:id", deleteProductControl);
productrouter.get("/", allProducts);
productrouter.get("/:id", getProductcontroler);

module.exports = productrouter;
