const express = require("express");
const cartRouter = express.Router();
const {
  addProductToCart,
  getProductFromCart,
  updateProductToCart,
  deleteProductToCart,
} = require("../controller/cart.control");
const authToken = require("../middleware/auth");

cartRouter.post("/", authToken, addProductToCart);
cartRouter.get("/", authToken, getProductFromCart);
cartRouter.put("/", authToken, updateProductToCart);
cartRouter.delete("/", authToken, deleteProductToCart);

module.exports = cartRouter;
