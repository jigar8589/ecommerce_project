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
      
async function Updatequantity(productid) {
  const Quantityincrement = await cart.findOneAndUpdate(
    { productId: productid },
    { $inc: { quantity: 1 } }
  );
  return Quantityincrement;
}

async function QuantityPlus(productId,quantity) {
  const findQuantity = await cart.findOne({productId:productId})
  const plusQuantity = findQuantity.quantity + quantity
  console.log(plusQuantity)
  console.log(findQuantity)

  const UpdateQuantity = cart.findOneAndUpdate({productId:productId ,quantity:plusQuantity})
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



