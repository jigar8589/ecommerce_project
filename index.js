require("dotenv").config();
const express = require("express");
const router = require("./router/userRouter");
const productrouter = require("./router/productRouter");
const addressrouter = require("./router/addressRouter");
const cartrouter = require("./router/cartRouter");
const app = express();
require("./config");
app.use(express.json());
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", router);
app.use("/api/product", productrouter);
app.use("/api/address", addressrouter);
app.use("/api/cart", cartrouter);

app.listen(port, () => {
  console.log(`server run on PORT ${port}`);
});
