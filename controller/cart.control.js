const cartService = require("../service/cartService");

async function addProductToCart(req, res) {
  try {
    const body = req.body;
    const addProdcut = cartService.addToCart(body);
    if (body.userId != req.user.id) {
      return res.status(404).json({ error: "something went wrong..!" });
    } else {
      res.status(200).json({ message: "Product added to cart.." });
    }
  } catch (error) {
    res.status(404).json({ message: "Product not added.." });
  }
}

async function getProductFromCart(req, res) {
  try {
    const userid = req.body.userId;
    const getProduct = await cartService.getFromCart(userid);
    if (userid != req.user.id) {
      return res.status(404).json({ error: "something went wrong.!" });
    } else {
      res.status(200).json({ data: getProduct });
    }
  } catch (error) {
    res.status(404).json({ message: "product not found..!" });
  }
}

async function updateProductToCart(req, res) {
  try {
    const user_id = req.body.userId;
    const product_id = req.body.productId;
    const qnty = req.body.quantity;
    const findUserAndProduct = await cartService.findUserProduct(
      user_id,
      product_id,
      qnty
    );
    if (user_id != req.user.id) {
      return res.status(404).json({ error: "something went wrong.!" });
    }
    if (findUserAndProduct) {
      res.status(200).json({ message: "product updated" });
    } else {
      res.status(404).json({ message: "product or user not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "product not updated." });
  }
}

async function deleteProductToCart(req, res) {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const findProduct = await cartService.findAndDeleteProduct(
      productId,
      userId
    );
    if (userId != req.user.id) {
      return res.status(404).json({ message: "something went wrong.!" });
    }
    if (findProduct) {
      res.status(200).json({ message: "product deleted" });
    } else {
      res.status(404).json({ message: "product or user not found." });
    }
  } catch (error) {
    res.status(404).json({ message: "product not deleted." });
  }
}

module.exports = {
  addProductToCart,
  getProductFromCart,
  updateProductToCart,
  deleteProductToCart,
};
