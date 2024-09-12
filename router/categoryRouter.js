const {Addcategory,getAllCategory,UpdateCategory,DeleteCategory,getProductByCategory} = require("../controller/category.control")
const auth = require("../middlewere/auth")
const express  = require('express')
const categoryRouter = express.Router();



categoryRouter.post("/",auth,Addcategory)
categoryRouter.get("/",auth,getAllCategory);
categoryRouter.patch("/:id",auth,UpdateCategory)
categoryRouter.delete("/:id",auth,DeleteCategory)
categoryRouter.get("/:id",getProductByCategory)



module.exports = categoryRouter;
