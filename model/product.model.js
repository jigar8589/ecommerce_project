const mongoose = require("mongoose");

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
  createdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedate: {
    type: Date,
    default: Date.now,
  },
});

const product = mongoose.model("product", productSchema);

module.exports = product;
