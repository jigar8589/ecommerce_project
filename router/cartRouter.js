const express = require('express')
const cartRouter = express.Router()
const {postAddtoCart,getaddcartDetails,deletecartdetails,updateCartProduct} = require("../controller/cart.control")
const auth = require('../middlewere/auth')
const schemaValidation=require("../middlewere/schemaValidation")
const {addProductToCart,updateProductToCart}=require("../validation/validations")

cartRouter.post("/",auth,schemaValidation(addProductToCart,"body"),postAddtoCart)
cartRouter.get("/",auth,getaddcartDetails)
cartRouter.delete("/",auth,deletecartdetails)
cartRouter.put("/",auth,schemaValidation(updateProductToCart,"body"),updateCartProduct)




module.exports = cartRouter;