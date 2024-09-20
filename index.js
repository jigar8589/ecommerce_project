require("dotenv").config();
const express = require("express");
const router = require("./router/userRouter");
const productrouter = require("./router/productRouter");
const addressRouter = require("./router/addressRouter");
const cartRouter = require("./router/cartRouter");
const app = express();
require("./config");
app.use(express.json());
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", router);
app.use("/api/product", productrouter);
app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`server run on PORT ${port}`);
});
