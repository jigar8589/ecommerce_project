const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { genrateOTP } = require("../Util/email");
const user = require("../model/user.model");

// Define the manageUser function
async function manageUser(body) {
  // const { firstName, lastName, email, phoneNo, password } = body;
  const email = body.email;
  const existingEmail = await user.findOne({ email: email });

  if (existingEmail) {
    console.log("user exists.");
  } else {
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
  // Encrypt the password
}

async function verfiyUser(body) {
  const email = body.email;
  const otp = body.otp;
  const verfiyUser = await user.findOne({email,otp});
  
  return verfiyUser;
}

module.exports = {
  manageUser,
  verfiyUser,
};
