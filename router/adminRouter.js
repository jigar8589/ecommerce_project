const express = require("express");
const {updateproduct,productCreate,deleteProductControl} = require("../controller/admin.controler")
const adminrouter = express.Router(); 

adminrouter.post("/createproduct",productCreate)
adminrouter.put("/updateproduct/:id",updateproduct)
adminrouter.delete("/deleteproduct/:id",deleteProductControl)


module.exports = adminrouter
    
