const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { genrateOTP } = require("../Util/email");
const user = require("../model/user.model");

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

module.exports = {
  manageUser,
};
