require("dotenv").config();
const cors = require("cors");

const express = require("express");
const router = require("./router/userRouter");
const productrouter = require("./router/productRouter");
const app = express();
require("./config");
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", router);
app.use("/api/product", productrouter);

app.listen(port, () => {
  console.log(`server run on PORT ${port}`);
});
