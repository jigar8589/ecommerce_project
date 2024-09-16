const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const saltRounds = 10;
const { genrateOTP } = require("../Util/email");
const user = require("../model/user.model");
const Util = require("../Util/email");
const Address = require("../model/address.model");
const jwt = require('jsonwebtoken')



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
  const User = await user.find()
  return User;
}

// get user by ID and get address

async function getUserById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid ObjectId format");
  }
  const User = await user.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(id),
      },
    },
    {
      $project: {
        password: 0,
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "userId",
        as: "addresses",
      },
    },
  ]);
  return User;
}

async function findUserByEmail(body) {
  try {
    const useremail = body.email;
      const users = await user.findOne({ email: useremail });
      return users;
    }
  
   catch (error) {
    return error;
  
  }
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
      .select("+password");
      const password = users.password
      console.log("users:",password)
    const pass = body.password;
    console.log(pass)
    const match = await bcrypt.compare(pass, password);
    console.log(match)
    return match;
  } catch (error) {
    throw new Error("error !!!!!!!!!!");
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


const createTokenPromise = (payload, key, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, options, (error, token) => {
      if (error) return reject(error);
      resolve(token);
    });
  });

}


async function LoginAdmin(body){
  const Email = body.email
  const findAdminorNot = await user.findOne({email:Email,role:"admin"})
  return findAdminorNot
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
  createTokenPromise,
  LoginAdmin

};
