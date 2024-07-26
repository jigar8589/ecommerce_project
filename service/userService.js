const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { genrateOTP } = require("../Util/email");
const user = require("../model/user.model");

// Define the manageUser function
async function manageUser(body) {
  const encryptedPassword = await bcrypt.hash(body.password, saltRounds);
  // Generate OTP
  body.password = encryptedPassword;
  body.otp = genrateOTP();
  body.role = "user";

  // Create user in the database
  const createUser = await user.create(body);
  return createUser;
}

async function verfiyUser(body) {
  const email = body.email;
  const otp = body.otp;
  const verfiyUser = await user.findOne({ email, otp });

  return verfiyUser;
}

//  getall user
async function getUser() {
  const User = await user.find({});
  return User;
}

// get user by ID

async function getUserById(id) {
  const User = await user.findById(id);
  return User;
}

async function updateuser(id, isActive) {
  const updateUser = await user.findOneAndUpdate(
    { _id: id },
    { isActive: isActive }
  );
  return updateUser;
}

async function checkUserPassword(body) {
  //... fetch user from a db etc.
  try {
    const users = await user
      .findOne({ email: body.email })
      .populate("password");
    const oldpass = body.oldpassword;
    const match = await bcrypt.compare(oldpass, users.password);
    return match;
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePassword(body) {
  try {
    const newPassWord = body.newpassowrd;
    const updatedpass = await bcrypt.hash(newPassWord, 10);
    const email = body.email;
    const updatedUser = await user.findOneAndUpdate(
      { email: email },
      { $set: { password: updatedpass } }
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

async function userIsActiveCheck(body) {
  const email = body.email;
  try {
    const userActive = await user.findOne({ email: email, isActive: true });
    return userActive;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = {
  manageUser,
  getUser,
  getUserById,
  checkUserPassword,
  updatePassword,
  userIsActiveCheck,
  verfiyUser,
  updateuser,
};
