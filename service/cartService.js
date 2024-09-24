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
      
//****************************** Working On This API********************************************* */

// async function Updatequantity(userId,productId) {
//   const Quantityincrement = await cart.findOneAndUpdate(
//     { productId: productId ,userId:userId },
//     { $inc: { quantity: 1 }, }

//   );
//   return Quantityincrement;
// }

// async function findQuntityInDB(userId, productId) {
//     // Find the cart item first
//     
//     return cartItem
    
// }

async function Updatequantity(userId,productId){

  const cartItem = await cart.findOne({ productId: productId, userId: userId });
  const newQuantity = Math.min(cartItem.quantity + 1, 10);

const updatedCartItem = await cart.findOneAndUpdate(
  { userId: userId, productId: productId },
  { $set: { quantity: newQuantity } },
  { new: true } // Return the updated document
);
  console.log(updatedCartItem)
  return updatedCartItem
}

//***************************************************************************************************** */

async function QuantityPlus(userId,productId,quantity) {
  const findQuantity = await cart.findOne({userId:userId,productId:productId})
  const newQuantity = Math.min(findQuantity.quantity + quantity, 10);
  console.log("Get Quantity",findQuantity.quantity)
  console.log(newQuantity)
  console.log(findQuantity)

  const UpdateQuantity = cart.findOneAndUpdate({ 
    userId: userId, 
    productId: productId },                     // Match on userId and productId
    { $set: { quantity: newQuantity } },      // Update the quantity field
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
  QuantityPlus,
 
};



