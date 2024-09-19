const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required:true
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
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
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  }]

});

const User = mongoose.model("User", userSchema);

module.exports = User;
