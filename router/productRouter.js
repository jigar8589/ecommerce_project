const express = require("express");
const productrouter = express.Router();
const {
  createProduct,
  updateproduct,
  deleteProductControl,
  allProducts,
  getProductcontroler
} = require("../controller/product.control");

productrouter.post("/addproduct", createProduct);
productrouter.put("/updateproduct/:id", updateproduct);
productrouter.delete("/deleteproduct/:id", deleteProductControl);
productrouter.get("/getallproducts",allProducts)
productrouter.get("/:id",getProductcontroler)



module.exports = productrouter;
