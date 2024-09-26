const { string } = require("joi");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    default: "India",
  },
  pincode: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["House", "Office", "Apartment", "Other"],
  },
  name: {
    type: String,
    required: true,
  },
  PhoneNo: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default:false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
