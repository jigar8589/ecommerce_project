const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { genrateOTP } = require("../Util/email");
const user = require("../model/user.model");
const Util = require("../Util/email");

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

async function findUserEmail(body) {
  const email = body.email;
  const findUser = await user.findOne({ email: email });
  return findUser;
}

async function verfiyUser(body) {
  const email = body.email;
  const otp = body.otp;
  const verfiyUser = await user.findOne({ email: email, otp: otp });

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

async function findUserByEmail(body) {
  try {
    const useremail = body.email;
    const users = await user.findOne({ email: useremail });
    return users;
  } catch (error) {
    return error;
  }
}
async function updateuser(id, isActive) {
  const updateUser = await user.findOneAndUpdate(    
    { _id: id },
    { isActive:isActive }
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
    const newPassWord = body.newpassword;
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

// Login user checkpassword correct or not

async function checkUserLoginPassword(body) {
  try {
    const users = await user
      .findOne({ email: body.email })
      .populate("password");
    const pass = body.password;
    const match = await bcrypt.compare(pass, users.password);
    return match;
  } catch (error) {
    return error;
  }
}

//forget password

async function forgetUserPassword(body) {
  try {
    const email = body.email;
    const userActive = await user.findOne({ email: email });

    if (userActive && userActive.isActive) {
      const otp = generateOTP();
      await Util.sendmail(email, otp);
      await user.findOneAndUpdate({ email: email }, { $set: { otp: otp } });

      return { email: email, otpSent: true };
    } else {
      throw new Error("User is not active");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function verifyOtp(body) {
  const otp = body.otp;
  const verifyOtp = await user.findOne({ otp: otp });
  return verifyOtp;
}

// async function updatepassword(body,email){
//   const newpassword=body.password;
//   const updatePasswordCheck=await user.findOneAndUpdate({email:email},{$set:{password:newpassword}})
//   return updatePasswordCheck
// }

async function updateUserByOne(body) {
  try {
    const email = body.email;
    const firstname = body.firstName;
    const lastname = body.lastName;
    const phoneno = body.phoneNo;
    const updatedUser = await user.findOneAndUpdate(
      { email: email },
      { $set: { firstName: firstname, lastName: lastname, phoneNo: phoneno } }
    );
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    return error;
  }
}

async function userExist(query) {
  try {
    const useremail = query.email;
    const users = await user.findOne({ email: useremail });
    return users;
  } catch (error) {
    return error;
  }
}

async function UpdateOTP(query, otp) {
  const userEmail = query.email;
  const OTP = await user.findOneAndUpdate(
    { email: userEmail },
    { $set: { otp: otp } }
  );
  return OTP;
}

module.exports = {
  findUserEmail,
  manageUser,
  getUser,
  getUserById,
  checkUserPassword,
  findUserByEmail,
  updatePassword,
  userIsActiveCheck,
  verfiyUser,
  checkUserLoginPassword,
  updateuser,
  forgetUserPassword,
  verifyOtp,
  updateUserByOne,
  UpdateOTP,
  userExist,
};
