const express = require("express");
const productrouter = express.Router();
const { createProduct } = require("../controller/product.control");

productrouter.post("/addproduct", createProduct);

module.exports = productrouter;
