const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { genrateOTP } = require("../Util/email");
const user = require("../model/user.model");
const { sendmail } = require("../Util/email")

// Define the manageUser function
async function manageUser(body) {
  // const { firstName, lastName, email, phoneNo, password } = body;

  // Encrypt the password
  const encryptedPassword = await bcrypt.hash(body.password, saltRounds);

  // Generate OTP
  // const otp = genrateOTP();
  body.password = encryptedPassword;
  body.otp = genrateOTP();
  body.role = "user";

  // Create user in the database
  const createUser = await user.create(body);
  return createUser;
}

//  getall user 
  async function getUser() {
  const User = await user.find({})
  return User
}

// get user by ID

    async function getUserById(id) {
    const User = await user.findById(id)
    return User
  }

module.exports = {
  manageUser, getUser,getUserById
};
