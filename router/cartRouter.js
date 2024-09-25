const express = require('express')
const cartRouter = express.Router()
const {postAddtoCart,getaddcartDetails,deletecartdetails,updateCartProduct} = require("../controller/cart.control")
const auth = require('../middlewere/auth')
const schemaValidation=require("../middlewere/schemaValidation")
const {addProductTocart,updateProductTocart}=require("../validation/validations")

cartRouter.post("/",auth,schemaValidation(addProductTocart,"body"),postAddtoCart)
cartRouter.get("/",auth,getaddcartDetails)
cartRouter.delete("/",auth,deletecartdetails)
cartRouter.put("/",auth,schemaValidation(updateProductTocart,"body"),updateCartProduct)




module.exports = cartRouter;