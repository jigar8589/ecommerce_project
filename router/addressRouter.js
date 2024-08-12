const {
  adress,
  allAdressget,
  allAdressgetById,
  UpdateAddress,
  makeDafulatAddress
  
} = require("../controller/address.control");
const express = require("express");
const addressRouter = express();

addressRouter.post("/", adress);
addressRouter.get("/", allAdressget);
addressRouter.get("/:id", allAdressgetById);
addressRouter.put("/:id", UpdateAddress);
addressRouter.patch("/:id/make-default",makeDafulatAddress)
module.exports = addressRouter;
