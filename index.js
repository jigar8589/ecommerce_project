require("dotenv").config();
const express = require("express");
// const user = require("./model/user.model")
// const product=require("./model/product.model")
const router = require("./router/userRouter");
const productrouter = require("./router/productRouter");
// const { prototype } = require('nodemailer/lib/mime-node')
const app = express();
require("./config");
app.use(express.json());
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", router);
app.use("/api/product", productrouter);

app.listen(port, () => {
  console.log(`server run on PORT ${port}`);
});
