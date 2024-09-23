const {Addcategory,getAllCategory,UpdateCategory,DeleteCategory,getProductByCategory} = require("../controller/category.control")
const auth = require("../middlewere/auth")
const express  = require('express')
const categoryRouter = express.Router();
const schemaValidation=require("../middlewere/schemaValidation");
const {createCategory,updateCategory}=require("../validation/validations")


categoryRouter.post("/",auth,schemaValidation(createCategory,"body"),Addcategory)
categoryRouter.get("/",auth,getAllCategory);
categoryRouter.patch("/:id",auth,schemaValidation(updateCategory,"body"),UpdateCategory)
categoryRouter.delete("/:id",auth,DeleteCategory)
categoryRouter.get("/:id",getProductByCategory)



module.exports = categoryRouter;
