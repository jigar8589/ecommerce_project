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
const schemaValidation=require("../middlewere/schemaValidation")
const {createAddress,updateAddress,getAddressById,makeDefault}=require("../validation/validations")

addressRouter.post("/", auth, schemaValidation(createAddress,"body"),adress);
 addressRouter.get("/", auth, allAdressget);
addressRouter.get("/", auth,allAdressgetById);
addressRouter.put("/:id", auth,schemaValidation(updateAddress,"body"),UpdateAddress);
addressRouter.patch("/:id/make-default", auth,schemaValidation(makeDefault,"params"), makeDafulatAddress);
addressRouter.delete("/:id",auth,DeleteAddress)

module.exports = addressRouter;
