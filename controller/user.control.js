
const { manageUser,
  getUser,
  getUserById,
  findUserByEmail,
  checkUserPassword,
  updatePassword ,
  userIsActiveCheck}
  = require("../service/userService")
const Util = require('../Util/email')




async function handleUser(req, res) {

  try {
    const userCreate = await manageUser(req.body)
    if (!userCreate) {
      res.json({ massage: "User not create" })
    } else {
      const sendmailservice = await Util.sendmail(req.body.email, req.body.otp)
      res.json({ massage: "User create" })
    }

    res.status(200).json({ data: userCreate })



  } catch (error) {
    console.log(error);
  }

}

async function getAllUser(req, res) {
  try {

    const Userall = await getUser()
    res.status(200).send(Userall)

  } catch (error) {

    console.log(error);


  }
}


//get user by id router

async function getUserId(req, res) {
  try {
    const user = await getUserById(req.params.id)
    res.status(200).send(user)
  } catch (error) {
    console.log(error);
  }
}



async function resetPassword(req, res) {

  const rest = await findUserByEmail(req.body)
  if (rest) {

    const active = await userIsActiveCheck(req.body)
    if (active) {
      const userPasscheck = await checkUserPassword(req.body)
      if (!userPasscheck) {
        res.json({ massage: "Email and password incorrect" })
      } else {
        const newPassword = await updatePassword(req.body)
        res.status(200).json({ massage: "password update successfuly" })
      }

    }
    else {
      res.json({ massage: "user is not active" })
    }
  } 
  else {
    // const userpasscheck = await checkUser(req.body)
    res.send("user  not exist")
  }



}





module.exports = {
  handleUser,
  getAllUser,
  getUserId, resetPassword
}