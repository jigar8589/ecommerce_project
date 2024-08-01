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

module.exports = { createProduct };
