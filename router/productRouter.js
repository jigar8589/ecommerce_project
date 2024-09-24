const express = require("express");
const productrouter = express.Router();
const {
  createProduct,
  updateproduct,
  deleteProductControl,
  allProducts,
  getProductcontroler,
} = require("../controller/product.control");
const schemaValidation=require("../middleware/schemaValidation");
const {createproduct,updateProduct}=require("../validation/validations")

productrouter.post("/", schemaValidation(createproduct,"body"),createProduct);
productrouter.put("/:id", schemaValidation(updateProduct,"body"),updateproduct);
productrouter.delete("/:id",deleteProductControl);
productrouter.get("/", allProducts);
productrouter.get("/:id",getProductcontroler);

module.exports = productrouter;
