const service = require("../service/addressService");

// **************************************** Add Adress Controller ********************************************/
async function adress(req, res) {
  try {
    const tokenid = req.user._id;
    const Adress = await service.PostAdress(req.body, tokenid); // add user address
    res.json({ data: Adress });
  } catch (error) {
    console.log(error);
    res.json({ error: "some error please try agin" });
  }
}

//**************************************** Get address Controller *********************************************/

async function allAdressget(req, res) {
  try {
    const Adress = await service.getAddressData(); //get all address
    res.json({ data: Adress });
  } catch (error) {
    console.log(error);
    res.json({ error: "some error please try again" });
  }
}

// *************************************** All Address Get Controller *****************************************/

async function allAdressgetById(req, res) {
  try {
    const tokenId = req.user._id.toHexString(); // token id convert to hexString
    const address = await service.getAdreessDataById(req.params.id);
    if (tokenId !== address.userId._id.toHexString()) {
      res.status(403).json({ Message: "Access denied." });
    }
    res.json({ data: address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server reror. Please try again." });
  }
}

// ************************************** Update Address Controller  *****************************************/
async function UpdateAddress(req, res) {
  //   try {
  //     tokenId = req.user._id.toHexString();
  //     const verifyAddress = await service.verifyAddressById(req.params.id);
  //     // console.log(verifyAddress.userId.toHexString())
  //     if (tokenId !== verifyAddress.userId.toHexString()) {
  //       res.status(401).json({ Message: "Somthing went wrong" });
  //     }
  //     if (verifyAddress) {
  //       const addressUpdated = await service.updateAddressById(req.params.id, req.body);
  //       res.json({ Message:"Address Update sucessfully" });
  //     } else {
  //       res.json({ Message: "Address not found" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.json({ Message: "Address not Update " });
  //   }

  try {
    const tokenId = req.user._id.toHexString();
    const verifyAddress = await service.verifyAddressById(req.params.id);

    if (!verifyAddress) {
      return res.status(404).json({ Message: "Address not found" }); // Exit after response
    }

    if (tokenId !== verifyAddress.userId.toHexString()) {
      return res.status(401).json({ Message: "Unauthorized access" }); // Exit after response
    }

    await service.updateAddressById(req.params.id, req.body);
    return res.json({ Message: "Address updated successfully" }); // Exit after response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Message: "Failed to update address" }); // Exit after response
  }
}

//*************************************** Make Defualat Address Controller **************************************

async function makeDafulatAddress(req, res) {
  try {
    const id = req.params.id;
    const tokenId = req.user._id.toHexString();
    const verifyUserId = await service.userVerify(id, tokenId);

    if (!verifyUserId) {
      return res.status(404).json({ Message: "User address not found " });
    }
    const addressDefualat = await service.defaultCheck(tokenId);
    const data = await service.setDefaultAddress(id);
    res.json({ Message: "address default successfully" });
  } catch (error) {
    console.log(error);
    res.json({ Message: "Address Id wrong" });
  }
}

// *************************************** Delete Address Controller ********************************************
async function DeleteAddress(req, res) {
  const deleteadd = await service.userVerify(req.params.id, req.user._id);
  if (!deleteadd) {
    return res.status(404).json({ error: "Address not found" });
  }
  const deleteAdress = service.DeleteAddressById(req.params.id);
  res.status(200).json({ Message: "Address Delete Sucessfully" });
}

module.exports = {
  adress,
  allAdressget,
  allAdressgetById,
  UpdateAddress,
  makeDafulatAddress,
  DeleteAddress,
};
