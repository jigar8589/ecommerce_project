const Address = require("../model/address.model");
const mongoose = require("mongoose");

//create address in databases
async function PostAdress(body,tokenid) {
  const bodydata = body;
  bodydata.userId = tokenid
  const findUserId = await Address.find({userId:tokenid});
  if (findUserId.length < 1 ) {
    bodydata.isDefault = true;
  } 
    const adress = new Address(bodydata);
     const saveadress = await adress.save();
    console.log(saveadress);
    return saveadress;
  }


//get address in db
async function getAddressData() {
  const adress = await Address.find().populate("userId");
  return adress;
}
// get all address in db

async function getAdreessDataById(id) {
  const adress = await Address.find({ userId: id })
  return adress;
}
// Update address in db

async function verifyAddressById(id) {
  const adress = await Address.findById({ _id: id });
  return adress;
}

async function updateAddressById(id, body) {
  try {
    const {
      street,
      landmark,
      city,
      state,
      country,
      pincode,
      type,
      name,
      phoneNo,
    } = body;

    const adress = await Address.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          street: street,
          landmark: landmark,
          city: city,
          state: state,
          country: country,
          pincode: pincode,
          type: type,
          name: name,
          phoneNo: phoneNo,
        },
      }
    );

    const findaddress = Address.findById({ _id: id });
    return findaddress;
  } catch (error) {
    throw new Error(error);
  }
}

// verify user in make dafualt
async function userVerify(id, userId) {
  const userIdfind = await Address.findOne({ _id: id, userId: userId });
  // console.log(userIdfind);
  return userIdfind;
}

//check user address default or not
async function defaultCheck(userId) {
  try {
    const adrressId = await Address.findOne({
      userId: userId,
      isDefault: true,
    }).select("_id");
    if (adrressId) {
      const defulatfalse = await Address.findOneAndUpdate(adrressId, {
        $set: { isDefault: false },
      });
      return defulatfalse;
    }
  } catch (error) {
    throw new Error(error);
  }
}

// user address default
async function setDefaultAddress(id) {
  try {
    const isDefault = true;
    const updateDefault = await Address.findByIdAndUpdate(
      { _id: id },
      { $set: { isDefault: isDefault }}
    );
    return updateDefault;
  } catch (error) {
    console.log("this error", error);
  }
}




async function DeleteAddressById(id) {

  const deleteaddress = await Address.findByIdAndDelete(id)
  return deleteaddress 
}

module.exports = {
  PostAdress,
  getAddressData,
  getAdreessDataById,
  updateAddressById,
  verifyAddressById,
  userVerify,
  defaultCheck,
  setDefaultAddress,
  DeleteAddressById
 
};
