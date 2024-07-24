
const { manageUser, getUser ,getUserById } = require("../service/userService")
const Util = require('../Util/email')




async function handleUser(req, res) {

  try {
    const userCreate = await manageUser(req.body)
    if (!userCreate) {
      res.json({ massage: "User not create" })
    } else {
      const sendmailservice = await Util.sendmail(req.body.email, req.body.otp)
      res.json({ massage: "OTP send successfully" })
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



module.exports = { handleUser,
   getAllUser ,
   getUserId}