const address = require("../model/address.model");

async function addAddress(body) {
  const addressData = new address({
    street: body.street,
    landmark: body.landmark,
    city: body.city,
    state: body.state,
    country: body.country,
    pincode: body.pincode,
    type: body.type,
    name: body.name,
    phone: body.phone,
    isDefault: body.isDefault,
    userId: body.userId,
  });
  const createAddress = await addressData.save();
  return createAddress;
}

async function findUserAddress(id) {
  const findAddress = await address.findById(id).populate("userId");
  return findAddress;
}

async function serchUserAddress(id) {
  const findUserAddress = await address.findById(id);
  return findUserAddress;
}

async function deleteAddress(id) {
  const deleteAddress = await address.findByIdAndDelete(id);
  return deleteAddress;
}

async function findAddress(id) {
  const findaddress = await address.aggregate([
    {
      $match: {
        _id: id,
      },
      $lookup: {
        from: "addresses",
        localField: "id",
        foreignField: "userId",
        as: "Addresses",
      },
    },
  ]);
  return findaddress;
}

async function findUserWithAddress(addressid, userId) {
  const findUserByAddressId = await address.findById(
    { _id: addressid },
    { userId: userId }
  );
  if (findUserByAddressId) {
    await address.updateMany({ $set: { isDefault: false } });

    const makeUserDefalutTrue = await address.findByIdAndUpdate(addressid, {
      $set: { isDefault: true },
    });
    // const makeUserDefalutFalse=await address.findByIdAndUpdate(addressid,{$set:{isDefault:false}})
    return makeUserDefalutTrue;
  } else {
    return "Address or user not found..";
  }
}

module.exports = {
  addAddress,
  findUserAddress,
  deleteAddress,
  findAddress,
  serchUserAddress,
  findUserWithAddress,
};
