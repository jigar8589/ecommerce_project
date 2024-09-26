const {Addcategory,getAllCategory,UpdateCategory,DeleteCategory,getProductByCategory} = require("../controller/category.control")
const auth = require("../middlewere/auth")
const express  = require('express')
const categoryRouter = express.Router();
const schemaValidation=require("../middlewere/schemaValidation");
const {createCategory,updateCategory,deleteCategory,getCategoryById}=require("../validation/validations")


categoryRouter.post("/",auth,schemaValidation(createCategory,"body"),Addcategory)
categoryRouter.get("/",getAllCategory);
categoryRouter.patch("/:id",auth,schemaValidation(updateCategory,"body"),UpdateCategory)
categoryRouter.delete("/:id",auth,schemaValidation(deleteCategory,"params"),DeleteCategory)
categoryRouter.get("/:id",schemaValidation(getCategoryById,"params"),getProductByCategory)



module.exports = categoryRouter;
