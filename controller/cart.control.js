const cartservice = require("../service/cartService");


// *********************************** Add to Cart Controller ******************************************

// async function postAddtoCart(req, res) {
//   try {
//     const tokenId = req.user._id.toHexString();
//     const UserId = req.body.userId;
//     const productid = req.body.productId;
//     const Quantity = req.body.quantity;
//     const CheckproductIdExist = await cartservice.findUserId(
//       tokenId,
//       productid
//     );

//     if (!CheckproductIdExist) {
//        const addcart =  await cartservice.addToCart(productid, tokenId, Quantity);
//        res.json({ Massaeg: "New Product Add Successfully " });
//     } else {
//       if (!Quantity) {
//         const updateQuantity = await cartservice.Updatequantity(productid);
//         return res.json({ Message: "Quantity Increment Successfully" });
//       }
//       const findquantity = await cartservice.QuantityPlus(productid, Quantity);
//       res.json({ Message: "Quntity Update Successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ error: "please try agin letter" });
//   }
// }

async function postAddtoCart(req, res) {
  try {
    const tokenId = req.user._id.toHexString();
    const { productId, quantity } = req.body;

    const productExists = await cartservice.findUserId(tokenId, productId);

    if (!productExists) {
      await cartservice.addToCart(productId, tokenId, quantity);
      return res.json({ message: "Product added successfully." });
    }

    if (!quantity) {
      await cartservice.Updatequantity(tokenId);
      return res.json({ message: "Quantity incremented successfully." });
    }

    await cartservice.QuantityPlus(tokenId, quantity);
    res.json({ message: "Quantity updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
}


// ***********************************  Get Cart Details **********************************************

async function getaddcartDetails(req, res) {
  try {
    const tokenId = req.user._id.toHexString();
    // const UserId = req.body;
    const getaddcart = await cartservice.addcartdetailsByUserId(tokenId);
    res.json({ data: getaddcart });
  } catch (error) {
    console.log(error);
    res.json({ Message: "Some Error" });
  }
}
 
// ********************************** Delete Cart Details ************************************************
async function deletecartdetails(req, res) {
  try {
    // const UserId = req.body.userId;
    const tokenId = req.user._id;
    const productid = req.body.productId;
    const finduseridAndProductId = await cartservice.findUserId(
      tokenId,
      productid
    );
    console.log(finduseridAndProductId);
    if (!finduseridAndProductId) {
      res.json({ Message: "productId not found" });
    } else {
      const cartdeleted = await cartservice.deleteaddcartDetails(productid);
      console.log(cartdeleted);
      res.json({ Message: "product delete Successfully", data: cartdeleted });
    }
  } catch (error) {
    console.log(error);
    res.json({ Message: "product not deleted" });
  }
}

// ******************************** Update Cart Quntity **************************************************
async function updateCartProduct(req, res) {
  try {
    const tokenId = req.user._id.toHexString();
    // const UserId = req.body.userId;
    const productid = req.body.productId;
    const Quantity = req.body.quantity;

    if (!Quantity == 0) {
      const finduseridAndProductId = await cartservice.findUserId(
        tokenId,
        productid
      );
      if (!finduseridAndProductId) {
        res.status(200).json({ Message: "ProductId not found" });
      } else {
        const UpdateCart = cartservice.UpdateCartProductDetails(
          productid,
          Quantity
                                                                                      
        );
        res
          .status(200)
          .json({ Message: "product Quantity Update Successfully" });
      }
    } else {
      res.json({ Message: "minimum quantity is 1" });
    }
  } catch (error) {
    res.status(404).json({ massaeg: "Some Error please try agian" });
    console.log(error);
  }
}

module.exports = {
  postAddtoCart,
  getaddcartDetails,
  deletecartdetails,
  updateCartProduct,
};
