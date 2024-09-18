const userService = require("../service/userService");
require("dotenv").config();
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
  createTokenPromise,
  LoginAdmin,UpdateOTPinForgetpassword
} = require("../service/userService");
const Util = require("../Util/email");
const {validateUser,validateLogin,validateResetPassword}=require("../validation/userValidation")

//******************************** * create new user controller ****************************************

async function handleUser(req, res) {
  try {

     const {error}=validateUser(req.body);
     if(error) return res.status(400).send(error.details[0].Message);

    const findUser = await userService.userExist(req.body); // Check User Exist or not
    if (findUser) {
      return res.status(404).send("User already exists..");
    } else {
      const userCreate = await manageUser(req.body); // new user save in  databases
      res.json({ data: userCreate });

      if (!userCreate) {
        res.status(404).send({ Message: "User not create" }); // user not create then resopnse in server
      } else {
        const sendmailservice = await Util.sendmail(
          // send otp in user Email id using sendEmail function
          req.body.email,
          req.body.otp
        );

       return res.status(200).send("User created");
      }
    }
    // res.status(200).send({ data: userCreate });
  } catch (error) {
    console.log(error);
  }
}
//************************************ User otp verify controller ************************************** */

async function handleVerification(req, res) {
  try {
    const verifyUser = await verfiyUser(req.query); // check user Verify
    if (verifyUser) {
      const updateUser = await updateuser(verifyUser._id, (isActive = true)); // user veify and isActive: true
      res.status(200).send({ data: updateUser });
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ Message: "user not verified" });
  }
}

//************************************ get all User in databases controller *****************************/

async function getAllUser(req, res) {
  try {
    const Userall = await getUser(); // get all user function call
    res.status(200).send(Userall);
  } catch (error) {
    console.log(error);
  }
}

// ******************************** get user using Id ***************************************************/
async function getUserId(req, res) {
  try {
    const id = req.params.id;
    const userid = req.user._id;
    console.log("id", id);
    console.log("userid", userid);
    if (id != userid) {
      res.status(404).json({ Message: "Somthing went wrong" });
    }
    const user = await getUserById(id); // get user function
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
  }
}

// ************************************** restpassword controller *********************************************/

async function resetPassword(req, res) {
  try {
    const { error } = validateResetPassword(req.body);
    if (error) return res.status(400).send(error.details[0].Message);

    const userEmail = req.body.email;
    const tokenEmail = req.user.email;
    if (userEmail == tokenEmail) {
      const rest = await findUserByEmail(req.body); // find user using Email funcation call

      if (rest) {
        const active = await userIsActiveCheck(req.body); // User Active or not check

        if (active) {
          const userPasscheck = await checkUserPassword(req.body); // verify password

          if (!userPasscheck) {
            res.status(404).json({ Message: "Email and password incorrect" });
          } else {
            const newPassword = await updatePassword(req.body);
            res.status(200).json({ Message: "password update successfuly" });
          }
        } else {
          res.status(404).json({ Message: "user is not active" });
        }
      } else {
        res.send("user  not exist");
      }
    } else {
      res.json({ Message: "somthing went wrong" });
    }
  } catch (error) {
    console.log(error);
  }
}

// *************************************  user login  *********************************************************/

async function loginUser(req, res) {
  try {

     const {error}=validateLogin(req.body);
     if(error) return res.status(400).send(error.details[0].Message)

    const User = await findUserByEmail(req.body); // check user Exist or not using email
    if (!User) {
      return res.status(404).json({ Message: "User not exist" });
    }

    if (!User.isActive) {
      // check user Active ot not
      return res.status(403).json({ Message: "User is not active" });
    }

    const isPasswordCorrect = await checkUserLoginPassword(req.body); // verify password
    if (!isPasswordCorrect) {
      return res.status(401).json({ Message: "Email and password incorrect" });
    }

    const token = await createTokenPromise(
      // create jwttoken
      { userId: User._id, email: User.email },
      "process.env.JWT_SECRECT",
      { expiresIn: "2d" }
    );
    return res
      .status(200)
      .json({ Message: "User login successfully", data: User, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: "Internal server error" });
  }
}

//*************************************** forget password controller **************************************** */

async function forgotPassword(req, res) {

   try {
  
    const verifyEmail = userService.findUserByEmail(body)
    if(!verifyEmail){
      res.json({Message:"User Not Exist"})
    }
    const verifyOTP =  userService.verfiyUser(body)
    if(!verifyOTP){
      res.json({Message:"OTP Wrong"})
    }
    const UpdatePassword = userService.updatePassword(body)
    res.json({Massage:"Update Password Successfully", data:UpdatePassword})
   } catch (error) {
       console.log(error)
   }
 
 }


// *************************************** update user controller ***************************************** */

async function updateUser(req, res) {
  try {
    const userEmail = req.body.email;
    const tokenEmail = req.user.email;

    if (userEmail == tokenEmail) {
      const user = await findUserByEmail(req.body); // find user using email id
      if (!user) {
        return res.status(404).json({ Message: "User not exist" });
      } else {
        const isActive = await userIsActiveCheck(req.body); // check user verify or not

        if (!isActive) {
          res.json({ Message: "User is not active" });
        } else {
          const updateuserone = await updateUserByOne(req.body); // update user
          res.json({ Message: "User Update Successfully" });
        }
      }
    } else {
      res.json({ Message: "somthing went wrong" });
    }
  } catch (error) {
    console.log(error);
  }
}

// *************************************** send otp controller ********************************************* */

async function EmailveriifyForgetAPI(req, res) {
  const checkUserExist = await userExist(req.query);
  if (!checkUserExist) {
    res.send({ Message: "User not exist" });
  } else {
    const otp = Util.genrateOTP();
    const sendemailis = await Util.sendmail(req.query.email, otp);
    const otpUpdate = await UpdateOTP(req.query, otp);
    res.json({ Message: "send email successfully", data: sendemailis });
  }
}

//************************************************* Admin Login Controller **********************************/

async function AdminLogin(req, res) {
  try {
    const adminLogin = await LoginAdmin(req.body);
    if (!adminLogin) {
      res.status(404).json({ Message: "EmailId not Found" });
    }

    const CheckAdminPassword = await checkUserLoginPassword(req.body);
    if (!CheckAdminPassword) {
      res.status(400).json({ Message: "Email And Password incorrect" });
    } else {
      const Admintoken = await createTokenPromise(
        { userId: adminLogin._id, email: adminLogin.email },
        process.env.JWT_SECRECT,
        { expiresIn: "2d" }
      );

      res
        .status(200)
        .json({ Message: "Login Successfully", token: Admintoken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal Server Error" }); // Ensure you send an error response if something goes wrong
  }
}
module.exports = {
  handleUser,
  getAllUser,
  resetPassword,
  handleVerification,
  loginUser,
  forgotPassword,
  updateUser,
  EmailveriifyForgetAPI,
  getUserId,
  AdminLogin,
};
