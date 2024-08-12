const service = require("../service/addressService");

// add adress in service folder
async function adress(req, res) {
  const Adress = await service.PostAdress(req.body);
  res.json({ data: Adress });
}
// get address in service folder
async function allAdressget(req, res) {
  const Adress = await service.getAddressData();
  res.json({ data: Adress });
}
// all address get in service folder

async function allAdressgetById(req, res) {
  const id = req.params.id;
  const Adress = await service.getAdreessDataById(id);
  res.json({ data: Adress });
}

async function UpdateAddress(req, res) {
  try {
    id = req.params.id;
    const verifyAddress = service.verifyAddressById(id);

    if (verifyAddress) {
      const addressUpdated = await service.updateAddressById(id, req.body);
      res.json({ data: addressUpdated });
    } else {
      res.json({ massage: "Address id is not defined" });
    }

  } catch (error) {
    console.log(error);
    res.json({ massage: "Address not Update " });
  }
}

// Make defualat address

async function makeDafulatAddress(req, res) {

  try {
    const id = req.params.id;
    const userId = req.body.userId;
    const verifyUserId = await service.userVerify(id, userId);

    if (verifyUserId) {
      const addressDefualat = await service.defaultCheck(userId);
      const data = await service.setDefaultAddress(id);
      res.json({ massage: "address default successfully" });
    } else {
      res.json({ massage: "User address not found " });
    }

  } catch (error) {
    console.log(error);
    res.json({ massage: "Address Id wrong", Error: error });
  }
}

module.exports = {
  adress,
  allAdressget,
  allAdressgetById,
  UpdateAddress,
  makeDafulatAddress,
};
