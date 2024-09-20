const userService = require("../service/userService");
const jwt = require("jsonwebtoken");
require("dotenv");

const {
  manageUser,
  getUser,
  getUserById,
  findUserByEmail,
  checkUserPassword,
  updatePassword,
  userIsActiveCheck,
  checkUserLoginPassword,
  updateUserByOne,
  UpdateOTP,
  userExist,
} = require("../service/userService");
const Util = require("../Util/email");

async function handleUser(req, res) {
  try {
    const findUser = await userService.userExist(req.body);
    if (findUser) {
      return res.status(404).send({ message: "User already exists.." });
    } else {
      const userCreate = await manageUser(req.body);
      res.json({ message: "user registered successfully.." });
      if (!userCreate) {
        return res.status(404).send({ massage: "User not create" });
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
    const verifyUser = await userService.verifyUser(req.query);
    if (verifyUser) {
      const updateUser = await userService.updateUser(verifyUser.id, {
        isActive: true,
      });
      return res.status(200).send({ data: updateUser });
    } else {
      return res.status(404).send("User not found or OTP is incorrect");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error verifying user" });
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
    if (req.params.id != req.user.id) {
      return res.status(404).json({ error: "something went wrong.!" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
  }
}

async function resetPassword(req, res) {
  const rest = await findUserByEmail(req.body);
  if (req.body.email != req.user.email) {
    return res.status(404).json({ error: "something went wrong..!" });
  }
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
    res.status(404).send("user  not exist");
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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "process.env.SECREAT_KEY",
      { expiresIn: "5d" }
    );
    return res
      .status(200)
      .json({ message: "User login successfully", token: token });
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
// put request update user

async function updateUser(req, res) {
  const user = await findUserByEmail(req.body);
  if (req.body.email != req.user.email) {
    return res.status(404).json({ error: "something went wrong.!" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not exist" });
  } else {
    const isActive = await userIsActiveCheck(req.body);
    if (!isActive) {
      res.status(404).json({ massage: "User is not active" });
    } else {
      const updateuserone = await updateUserByOne(req.body);
      res.status(200).json({ massage: "User Update Successfully" });
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
