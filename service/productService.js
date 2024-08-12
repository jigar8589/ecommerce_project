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

// Update product

async function productUpdate(id, name, price, description, quantity) {
  try {
    const Update = product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          quantity: quantity,
        },
      }
    );

    return Update;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function productDelete(id) {
  const Delete = await product.findByIdAndDelete({ _id: id });
  return Delete;
}

async function getAllProducts(query) {
  // page=page;
  // limit=limit;
  if (query.page < 1 || query.limit < 1) {
    return "page number or limit should be greater than 0";
  }
  const totalDocuments=await product.find().countDocuments()
  console.log(totalDocuments);
   
  const allProduct = await product
  .find()  
  .skip((query.page - 1) * query.limit)
  .limit(query.limit);
  return allProduct;
}

// get product in databases

async function getproductById(id) {
  const productFind = await product.findById(id);
  return productFind;
}

module.exports = {
  addproduct,
  productUpdate,
  productDelete,
  getproductById,
  getAllProducts,
};
