const mongoose = require("mongoose");
const user = require("../model/user.model");
const userService = require("../service/userService");
const bcrypt = require("bcryptjs");

const {
  manageUser,
  getUser,
  getUserById,
  findUserByEmail,
  checkUserPassword,
  updatePassword,
  userIsActiveCheck,
  checkUserLoginPassword,
  updateuser,
  verfiyUser,
  updateUserByOne,
  UpdateOTP,
  userExist,
} = require("../service/userService");
const Util = require("../Util/email");

async function handleUser(req, res) {
  try {
    const findUser = await userService.verfiyUser(req.body);
    if (findUser) {
      res.status(404).send("User already exists..");
    } else {
      const userCreate = await manageUser(req.body);
      res.json({ data: userCreate });
      if (!userCreate) {
        res.status(404).send({ massage: "User not create" });
      } else {
        const sendmailservice = await Util.sendmail(
          req.body.email,
          req.body.otp
        );
        res.status(200).send("User created");
      }
    }
    // res.status(200).send({ data: userCreate });
  } catch (error) {
    console.log(error);
  }
}

async function handleVerification(req, res) {
  try {
    const verifyUser = await verfiyUser(req.query);
    if (verifyUser) {
      const updateUser = await userService.updateuser(
        verifyUser._id,
        req.isActive
      );
      res.status(200).send({ data: updateUser });
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ massage: "user not verified" });
  }
}

async function getAllUser(req, res) {
  try {
    const Userall = await getUser();
    res.status(200).send(Userall);
  } catch (error) {
    console.log(error);
  }
}

async function getUserId(req, res) {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
}

async function resetPassword(req, res) {
  const rest = await findUserByEmail(req.body);
  if (rest) {
    const active = await userIsActiveCheck(req.body);

    if (active) {
      const userPasscheck = await checkUserPassword(req.body);

      if (!userPasscheck) {
        res.status(404).json({ massage: "Email and password incorrect" });
      } else {
        const newPassword = await updatePassword(req.body);
        res.status(200).json({ massage: "password update successfuly" });
      }
    } else {
      res.status(404).json({ massage: "user is not active" });
    }
  } else {
    res.send("user  not exist");
  }
}

//  user login verify

async function loginUser(req, res) {
  try {
    const user = await findUserByEmail(req.body);
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User is not active" });
    }

    const isPasswordCorrect = await checkUserLoginPassword(req.body);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email and password incorrect" });
    }

    return res
      .status(200)
      .json({ message: "User login successfully", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//forget password

async function forgotPassword(req, res) {
  try {
    const verifyUser = await userService.findUserEmail(req.body);

    if (verifyUser && verifyUser.isActive == true) {
      const { otp, password: newpassword, email } = req.body;
      // const userWithOtp = await user.findOne({ email: email, otp: otp });
      if (verifyUser.otp != otp) {
        return res.status(400).json({ message: "Invalid otp" });
      }
      const updateUser = await userService.updatePassword({
        newpassword,
        email,
      });

      return res
        .status(200)
        .json({ message: "Password updated successfully", updateUser });
    } else {
      return res.status(404).json({ message: "User is not verified" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// put requiest update user

async function updateUser(req, res) {
  const user = await findUserByEmail(req.body);
  if (!user) {
    return res.status(404).json({ message: "User not exist" });
  } else {
    const isActive = await userIsActiveCheck(req.body);
    if (!isActive) {
      res.json({ massage: "User is not active" });
    } else {
      const updateuserone = await updateUserByOne(req.body);
      res.json({ massage: "User Update Successfully" });
    }
  }
}

async function sendOtp(req, res) {
  const checkUserExist = await userExist(req.query);
  if (!checkUserExist) {
    res.send({ massage: "User not exist" });
  } else {
    const otp = Util.genrateOTP();
    const sendemailis = await Util.sendmail(req.query.email, otp);
    const otpUpdate = await UpdateOTP(req.query, otp);
    res.json({ massage: "send email successfully", data: sendemailis });
  }
}

module.exports = {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,
  loginUser,
  forgotPassword,
  updateUser,
  sendOtp,
};
