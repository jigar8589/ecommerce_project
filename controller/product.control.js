const productService = require("../service/productService");
const categoryService = require("../service/categoryService");


//**************************************** create Product Controller************************************************ */
async function createProduct(req, res) {
  try {
    const tokenid = req.user._id;
    const reqfile = req.files;
    const body = req.body;
    const verifyAdmin = await categoryService.CheckAdmin(tokenid);   // verify Admin in category service
    if (!verifyAdmin) {
      res.status(401).json({ massage: "you are Unauthorised" });
    }
    const createproduct = await productService.addproduct(body, reqfile);
    res.status(200).json({ message: "Product created..",data:createProduct });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Product not created.." });
  }
}
/***************************************** Update Product controller ************************************************ */

async function updateproduct(req, res) {
  try {
    const id = req.params.id;
    const tokenid = req.user._id;
    const Name = req.body.name;
    const Price = req.body.price;
    const description = req.body.description;
    const quantity = req.body.quantity;

    const verifyAdmin = await categoryService.CheckAdmin(tokenid);
    if (!verifyAdmin) {
      res.status(401).json({ massage: "you are Unauthorised" });
    }
    const productUpdated = await productService.productUpdate(
      id,
      Name,
      Price,
      description,
      quantity
      // category,
      // SubCategory
    );
    res.json({ massage: "Product update sucessfully" });
  } catch (error) {
    res.json({ massage: "some error please tya again latter" });
  }
}
//**************************************** Delete Product Controller************************************************** */

async function deleteProductControl(req, res) {
  try {
    const tokenid = req.user_id;
    const id = req.params.id;
    const verifyAdmin = await categoryService.CheckAdmin(tokenid);
    if (!verifyAdmin) {
      res.status(401).json({ massage: "somthing went wrong" });
    }
    const productDeleted = await productService.productDelete(id);
    res.json({ massage: "Product delete sucessfully" });
  } catch (error) {
    res.json({ massage: "some error please try again letter" });
  }
}

/***************************************** Get All Product controller ************************************************ */

async function allProducts(req, res) {
  try {
    const allProducts = await productService.getAllProducts();
    res.status(200).json({ data: allProducts });
  } catch (error) {
    res.json({ massage: "some error please try again letter" });
  }
}
 /***************************************** Get Product ById  controller **********************************************/
async function getProductcontroler(req, res) {
  try {
    const id = req.params.id;
    const product = await productService.getproductById(id);
    res.json(product);
  } catch (error) {
    res.json({ massage: "some error please try agein letter" });
  }
}

module.exports = {
  createProduct,
  updateproduct,
  deleteProductControl,
  getProductcontroler,
  allProducts,
};
