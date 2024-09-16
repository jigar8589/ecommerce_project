const productService = require("../service/productService");
const categoryService = require("../service/categoryService");
const {validateCreateProduct,validateUpdateProduct}=require("../validation/productValidation")

//**************************************** create Product Controller************************************************ */
async function createProduct(req, res) {
  try {

    const{error}=validateCreateProduct(req.body);
    if(error) return res.status(400).json({message:error.details[0].message})

    const tokenid = req.user._id;
    const body = req.body;
    const verifyAdmin = 
    
    await categoryService.CheckAdmin(tokenid);   // verify Admin in category service
    if (!verifyAdmin) {
      res.status(401).json({ Message: "you are Unauthorised" });
    }
    const createproduct = await productService.addproduct(body);
    res.status(200).json({ Message: "Product created..",data:createProduct });
  } catch (error) {
    console.log(error);
    res.status(404).json({ Message: "Product not created.." });
  }
}
/***************************************** Update Product controller ************************************************ */

async function updateproduct(req, res) {
  try {

    const {error}=validateUpdateProduct(req.body);
    if(error) return res.status(400).json({message:error.details[0].message})

    const id = req.params.id;
    const tokenid = req.user._id;
    const {name,price,description,category_id,quantity,images} = req.body

    const verifyAdmin = await categoryService.CheckAdmin(tokenid);
    if (!verifyAdmin) {
      res.status(401).json({ Message: "you are Unauthorised" });
    }
    const productUpdated = await productService.productUpdate(
      id,
      name,
      price,
      description,
      quantity,
      category_id,
      images
    );
    res.json({ Message: "Product update sucessfully" });
  } catch (error) {
    res.json({ Message: "some error please tya again latter" });
  }
}
//**************************************** Delete Product Controller************************************************** */

async function deleteProductControl(req, res) {
  try {
    const tokenid = req.user._id;
    const id = req.params.id;
    const verifyAdmin = await categoryService.CheckAdmin(tokenid);
    if (!verifyAdmin) {
      res.status(401).json({ message: "somthing went wrong" });
    }
    const productDeleted = await productService.productDelete(id);
    res.json({ message: "Product delete sucessfully" });
  } catch (error) {
    res.json({ message: "some error please try again letter" });
  }
}

/***************************************** Get All Product controller ************************************************ */

async function allProducts(req, res) {
  try {
    const allProducts = await productService.getAllProducts();
    res.status(200).json({ data: allProducts });
  } catch (error) {
    res.json({ Message: "some error please try again letter" });
  }
}
 /***************************************** Get Product ById  controller **********************************************/
async function getProductcontroler(req, res) {
  try {
    const id = req.params.id;
    const product = await productService.getproductById(id);
    res.json(product);
  } catch (error) {
    res.json({ Message: "some error please try agein letter" });
  }
}

module.exports = {
  createProduct,
  updateproduct,
  deleteProductControl,
  getProductcontroler,
  allProducts,
};
