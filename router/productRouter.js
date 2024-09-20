const express = require("express");
const productrouter = express.Router();
const {
  createProduct,
  updateproduct,
  deleteProductControl,
  allProducts,
  getProductcontroler,
} = require("../controller/product.control");
const schemaValidation=require("../validation/schemaValidation");
const {createproduct,updateProduct,deleteProduct,getProduct}=require("../validation/validations")

productrouter.post("/", schemaValidation(createproduct,"body"),createProduct);
productrouter.put("/:id", schemaValidation(updateProduct,"body"),updateproduct);
productrouter.delete("/:id", schemaValidation(deleteProduct,"params"),deleteProductControl);
productrouter.get("/", allProducts);
productrouter.get("/:id", schemaValidation(getProduct,"params"),getProductcontroler);

module.exports = productrouter;
