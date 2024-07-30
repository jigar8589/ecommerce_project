const mongoose = require("mongoose");
const user = require("../model/user.model");
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
  updateUserByOne
} = require("../service/userService");
const Util = require("../Util/email");




async function handleUser(req, res) {
  try {
    const findUser=await verfiyUser(req.body)
    if (findUser) {
      res.status(404).send("User already exists..")
    }
    else{
      const userCreate = await manageUser(req.body);
      if (!userCreate) {
        res.status(404).send({ massage: "User not create" });
      } 
      else {
        const sendmailservice = await Util.sendmail(req.body.email, req.body.otp);
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
    const verifyUser = await userService.verfiyUser(req.query);
    if (verifyUser) {
      const updateUser = await updateuser(verifyUser._id,req.query.isActive);
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

    }else {
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

    return res.status(200).json({ message: "User login successfully",data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// put requiest update user 

async function updateUser(req,res){
  const user = await findUserByEmail(req.body);
  if (!user) {
    return res.status(404).json({ message: "User not exist" });
  }else{
    const updateUser = await updateUserByOne(req.body)
    console.log(updateUser);
    res.json({massage:"UserUpdate Successfully" })
  }
  

}



module.exports = {
  handleUser,
  getAllUser,
  getUserId,
  resetPassword,
  handleVerification,
  loginUser,
  updateUser,

};
