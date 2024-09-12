
const product = require("../model/product.model");

async function addproduct(body,requestFile) {

  let images = [];
  for (let i = 0; i < requestFile.length; i++) {
    images[i] = requestFile[i].filename;

  }
  if (images == []) {
    return res.status(400).json({
      message: "Please Upload Images",
    });
  }

  const productdata = new product({
    name: body.name,
    price: body.price,
    description: body.description,
    quantity: body.quantity,
    images: images,
    category:body.category_id
    
  });
  const createdProduct = await productdata.save();
  return createdProduct;
}

// Update product

async function productUpdate(id, name, price, description, quantity,category_id,requestFile) {
  
    let images = [];
    for (let i = 0; i < requestFile.length; i++) {
      images[i] = requestFile[i].filename;
  
    }
    
    const Update = product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          price: price,
          description: description,
          quantity: quantity,
          category:category_id,
          images:images
        },
      }
    );

    return Update;
  } 

async function productDelete(id) {
  const Delete = await product.findByIdAndDelete({ _id: id });
  return Delete;
}

async function getAllProducts() {
  const allProduct = await product.find({}).populate('category').exec();
  return allProduct;
}

// get product in databases

async function getproductById(id) {
  const productFind = await product.findById(id).populate('category').exec();
  return productFind;
}


module.exports = {
  addproduct,
  productUpdate,
  productDelete,
  getproductById,
  getAllProducts,
};
