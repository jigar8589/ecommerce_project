const cart = require("../model/cart.model");
const product = require("../model/product.model");

async function addToCart(productid,id,quantity) {
    try {
      const cartadd = await cart.create({productId:productid,
        userId:id ,quantity:quantity});
      return cartadd;
    } catch (error) {
      throw new Error(error)
    }
      } 
      
async function Updatequantity(userId,productId) {
  const Quantityincrement = await cart.findOneAndUpdate(
    { productId: productId ,userId:userId },
    { $inc: { quantity: 1 } }
  );
  return Quantityincrement;
}

async function QuantityPlus(userId,productId,quantity) {
  const findQuantity = await cart.findOne({userId:userId,productId:productId})
  const plusQuantity = findQuantity.quantity + quantity
  console.log("Get Quantity",findQuantity.quantity)
  console.log(plusQuantity)
  console.log(findQuantity)

  const UpdateQuantity = cart.findOneAndUpdate({ 
    userId: userId, 
    productId: productId },                     // Match on userId and productId
    { $set: { quantity: plusQuantity } },      // Update the quantity field
    { new: true }                              // Return the updated document
  );
  console.log(UpdateQuantity)
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



