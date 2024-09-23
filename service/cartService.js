const cart = require("../model/cart.model");
const product = require("../model/product.model");

async function addToCart(productid,id,quantity) {
    try {
      const cartadd = cart.create({productId:productid,
        userId:id ,quantity:quantity});
      return cartadd;
    } catch (error) {
      throw new Error(error)
    }
      } 
      
async function Updatequantity(userId) {
  const Quantityincrement = await cart.findOneAndUpdate(
    { userId: userId },
    { $inc: { quantity: 1 } }
  );
  return Quantityincrement;
}

async function QuantityPlus(userId,quantity) {
  const findQuantity = await cart.findOne({userId:userId})
  const plusQuantity = findQuantity.quantity + quantity
  console.log(plusQuantity)
  console.log(findQuantity)

  const UpdateQuantity = cart.findOneAndUpdate({userId:userId ,quantity:plusQuantity})
  return UpdateQuantity
}

async function addcartdetailsByUserId(userId) {
  const addtocart = await cart.find({userId:userId}).populate('productId');
  
  return addtocart;
}

async function findUserId(userId, productId) {
  const finduserid = await cart
    .findOne({ userId: userId, productId: productId })
    .exec();
  return finduserid;
}

async function deleteaddcartDetails(productId) {
  const deleteCartDetails = cart.findOneAndDelete({ productId: productId });
  return deleteCartDetails;
}

async function UpdateCartProductDetails(productid, quantity) {
  const Updatecartproduct = await cart.findOneAndUpdate(
    { productId: productid },
    { $set: { quantity: quantity } }
  );
  return Updatecartproduct;
}
module.exports = {
  addToCart,
  addcartdetailsByUserId,
  findUserId,
  deleteaddcartDetails,
  Updatequantity,
  UpdateCartProductDetails,
  QuantityPlus
};



