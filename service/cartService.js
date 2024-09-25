const cart = require("../model/cart.model");

async function addToCart(body) {
  const productData = new cart({
    userId: body.userId,
    productId: body.productId,
    quantity: body.quantity,
  });

  const find_with_userId = await cart.findOne({
    userId: productData.userId,
    productId: productData.productId,
  });

  if (find_with_userId) {
    const updateQuantity = await cart.findOneAndUpdate(
      {
        userId: find_with_userId.userId,
        productId: find_with_userId.productId,
      },
      { $inc: { quantity: 1 } }
    );

    return { message: "quantity updated.", updateQuantity };
  } else {
    const addProductToCart = await productData.save();
    return addProductToCart;
  }
}

async function getFromCart(userid) {
  const findProductById = await cart
    .find({ userId: userid })
    .populate("productId");
  return findProductById;
}

async function findUserProduct(userid, productid, qnty) {
  const findUser = await cart.findOne({ userId: userid });
  if (findUser) {
    const findProduct = await cart.findOne({
      userId: userid,
      productId: productid,
    });
    if (findProduct) {
      const updateProduct = await cart.updateOne(
        { userId: userid, productId: productid },
        { $set: { quantity: qnty } }
      );
      return updateProduct;
    } else {
      return { message: "product not found in user cart" };
    }
  } else {
    return { message: "user cart not found" };
  }
}

async function findAndDeleteProduct(productId, userId) {
  const findUser = await cart.findOne({ userId: userId });
  if (findUser) {
    const findProduct = await cart.findOne({ productId: productId });
    if (findProduct) {
      const deleteProduct = await cart.deleteOne({ productId: productId });
      return deleteProduct;
    } else {
      return;
    }
  } else {
    return;
  }
}

module.exports = {
  addToCart,
  getFromCart,
  findUserProduct,
  findAndDeleteProduct,
};
