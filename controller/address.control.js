const addressService = require("../service/addressService");

async function createAddress(req, res) {
  try {
    const body = req.body;
    const createaddress = addressService.addAddress(body);
    res.status(200).json({ message: "Address created.." });
  } catch (error) {
    res.status(404).json({ message: "Address not created" });
  }
}

async function getUserById(req, res) {
  try {
    const userid = req.params.id;
    const findAddress = await addressService.findUserAddress({ _id: userid });
    if (userid != req.user.id) {
      return res.status(403).json({ error: "something went wrong..!" });
    } else {
      res.status(200).json({ data: findAddress });
    }
  } catch (error) {
    res.status(404).json({ message: "User not found.." });
  }
}

async function deleteAddressById(req, res) {
  try {
    const userid = req.params.id;
    const findUserAddress = await addressService.serchUserAddress(userid);

    if (userid != req.user.id) {
      return res.status(404).json({ error: "something went wrong.!" });
    } else {
      const deleteAddress = await addressService.deleteAddress(userid);
      res.status(200).json({ message: "Address deleted" });
    }
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Address not deleted." });
  }
}

async function getAddress(req, res) {
  try {
    const userid = req.params.id;
    const findAddress = await addressService.findAddress(userid);
    if (userid != req.user.id) {
      return res.status(404).json({ error: "something went wrong.!" });
    }
    res.status(200).json({ data: findAddress });
  } catch (error) {
    res.status(404).json({ message: "User not found." });
  }
}

async function checkDefault(req, res) {
  try {
    const addressId = req.params.id;
    const userId = req.body.userId;
    const findWithAddressId = await addressService.findUserWithAddress(
      addressId,
      userId
    );
    if (findWithAddressId) {
      res.status(200).json({ message: "Default updated." });
    } else {
      res.status(404).json("Address not found..");
    }
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "User not found." });
  }
}

module.exports = {
  createAddress,
  getUserById,
  deleteAddressById,
  getAddress,
  checkDefault,
};
