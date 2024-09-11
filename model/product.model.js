const mongoose = require("mongoose");
const category = require("./categoty.model");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images:{
    type:Array
  },
  createdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedate: {
    type: Date,
    default: Date.now,
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category"
  },
  // subCategory_id:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"SubCategory"
  // }
});

const product = mongoose.model("product", productSchema);

module.exports = product;
