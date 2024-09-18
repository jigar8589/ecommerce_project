
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
const router = require("./router/userRouter");
const productrouter = require("./router/productRouter");
const addressRouter = require("./router/addressRouter")
const cartRouter = require("./router/cartRouter")
const categoryRouter = require("./router/categoryRouter")
const app = express();
app.use(cors())
require("./config");
app.use(express.json());


const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/users/", router);
app.use("/api/product", productrouter);
app.use("/api/adress",addressRouter)
app.use("/api/cart",cartRouter)
app.use("/api/category",categoryRouter)

app.listen(port, () => {
  console.log(`server run on PORT ${port}`);
});
 