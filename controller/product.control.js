const productService = require("../service/productService");

async function createProduct(req, res) {
  try {
    const body = req.body;
    const createproduct = await productService.addproduct(body);
    res.status(200).json({ message: "Product created.." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Product not created.." });
  }
}

// Update product
async function updateproduct(req, res) {
  const id = req.params.id;
  const Name = req.body.name;
  const Price = req.body.price;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const productUpdated = await productService.productUpdate(
    id,
    Name,
    Price,
    description,
    quantity
  );
  if (!productUpdated) {
    return res.status(404).json({ message: "Product not found..!" });
  }
  res.status(200).json({ massage: "Product update sucessfully" });
}

// Delete product
async function deleteProductControl(req, res) {
  const id = req.params.id;
  const productDeleted = await productService.productDelete(id);
  res.status(200).json({ massage: "Product delete sucessfully" });
}

async function allProducts(req, res) {
  const allProducts = await productService.getAllProducts(req.query);
  res.status(200).json({ data: allProducts });
}

// get all product

async function getProductcontroler(req, res) {
  const id = req.params.id;
  const product = await productService.getproductById(id);
  res.status(200).json(product);
}

module.exports = {
  createProduct,
  updateproduct,
  deleteProductControl,
  getProductcontroler,
  allProducts,
};
