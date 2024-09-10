const express = require('express')
const cartRouter = express.Router()
const {postAddtoCart,getaddcartDetails,deletecartdetails,updateCartProduct} = require("../controller/cart.control")
const auth = require('../middlewere/auth')

cartRouter.post("/",auth,postAddtoCart)
cartRouter.get("/",auth,getaddcartDetails)
cartRouter.delete("/",auth,deletecartdetails)
cartRouter.put("/",auth,updateCartProduct)




module.exports = cartRouter;