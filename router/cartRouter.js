const express = require("express");
const cartRouter = express.Router();
const {
  addProductToCart,
  getProductFromCart,
  updateProductToCart,
  deleteProductToCart,
} = require("../controller/cart.control");
const authToken = require("../middleware/auth");
const schemaValidation=require("../validation/schemaValidation");
const {addProductTocart,updateProductTocart}=require("../validation/validations")

cartRouter.post("/", authToken, schemaValidation(addProductTocart,"body"),addProductToCart);
cartRouter.get("/", authToken, getProductFromCart);
cartRouter.put("/", authToken, schemaValidation(updateProductTocart,"body"),updateProductToCart);
cartRouter.delete("/", authToken, deleteProductToCart);

module.exports = cartRouter;
