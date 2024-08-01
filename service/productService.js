const product = require("../model/product.model");

async function addproduct(body) {
  const productdata = new product({
    name: body.name,
    price: body.price,
    description: body.description,
    quantity: body.quantity,
  });
  const createdProduct = await productdata.save();
  return createdProduct;
}

module.exports = { addproduct };
