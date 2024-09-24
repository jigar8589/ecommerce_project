const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity must be at least 1'],  // Minimum quantity is 1
        max: [10, 'Quantity cannot exceed 10'],   // Maximum quantity is 10
    },

})

const cart = mongoose.model("cart",cartSchema)

module.exports =  cart
