const {
  adress,
  allAdressget,
  allAdressgetById,
  UpdateAddress,
  makeDafulatAddress,DeleteAddress
} = require("../controller/address.control");
const express = require("express");
const auth = require("../middlewere/auth");
const addressRouter = express();

addressRouter.post("/", auth, adress);
addressRouter.get("/", auth, allAdressget);
addressRouter.get("/:id", auth, allAdressgetById);
addressRouter.put("/:id", auth, UpdateAddress);
addressRouter.patch("/:id/make-default", auth, makeDafulatAddress);
addressRouter.delete("/:id",auth,DeleteAddress)
module.exports = addressRouter;
