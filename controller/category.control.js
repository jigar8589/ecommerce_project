const service = require("../service/categoryService");


//***************************************  Add Category  ******************************************************/

async function Addcategory(req, res) {
  try {
    const tokenId = req.user._id;
    const categoryName = req.body.categoryName;
    const product_id = req.body.product_id

    const findAdmin = await service.CheckAdmin(tokenId);
    if (!findAdmin) {
      res.json({ Message: " can't access" });
    }
    const category = await service.AddCategory(categoryName,product_id);
    res.json({ Message: "Add category Successfully" });
  } catch (error) {
    console.log(error);
  }
}

//****************************************** get All product *************************************************** */

async function getAllCategory(req, res) {
  try {
    // const tokenId = req.user._id;
    const category = await service.getCategory();
    res.json({ data: category });
  } catch (error) {
    console.log(error);
  }
}


//****************************************** Update Category *************************************************** */
async function UpdateCategory(req, res) {
  try {
    const tokenId = req.user._id;
    const id = req.params.id;
    const categoryName = req.body.categoryName;
    const findAdmin = await service.CheckAdmin(tokenId);
    if (!findAdmin) {
      res.status(401).json({ Message: "can't Access" });
    }

    const categoryUpdated = await service.UpdateCategory(id, categoryName);
    res.status(200).json({ Message: "category updated" });
  } catch (error) {
    console.log(error);
  }
}

//******************************************* Delete Category ************************************************** */

async function DeleteCategory(req, res) {
  try {
    const tokenId = req.user._id;
    const id = req.params.id;
    const findAdmin = await service.CheckAdmin(tokenId);
    if (!findAdmin) {
      res.status(401).json({ Message: "can't Access" });
    }

    const deletecategory = await service.DeleteCategory(id);
    res.json({Message:"category Deleted successfully",data:deletecategory})
  } catch (error) {
    console.log(error);
  }
}


//******************************************** Get Product By category *******************************************/


async function getProductByCategory(req,res){
  try {
    const category_id = req.params.id
    const getProductdata = await service.getProduct(category_id)
    if(getProductdata.length === 0){
      return res.status(404).json({ message: 'No products found in this category' });
  }
  res.json(getProductdata);
    
  } catch (error) {
    console.log(error)
    res.status(404).json({error:"Some error please try agian"})
    
  }
}

module.exports = {
  Addcategory,
  getAllCategory,
  UpdateCategory,
  DeleteCategory,
  getProductByCategory
};



