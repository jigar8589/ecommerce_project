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
const {createaddress,updateAddress}=require("../validation/validations")

addressRouter.post("/", auth, schemaValidation(createaddress,"body"),adress);
addressRouter.get("/", auth, allAdressget);
addressRouter.get("/:id", auth,allAdressgetById);
addressRouter.put("/:id", auth,schemaValidation(updateAddress,"body"),UpdateAddress);
addressRouter.patch("/:id/make-default", auth,makeDafulatAddress);
addressRouter.delete("/:id",auth,DeleteAddress)
module.exports = addressRouter;
