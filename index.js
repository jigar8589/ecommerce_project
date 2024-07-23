const express = require('express')
const user = require("./model/user.model")
 const router= require("./router/userRouter")
const { prototype } = require('nodemailer/lib/mime-node')
require("./config")
require("./passwordencrept")
const app = express();
app.use(express.urlencoded({extended:true}))
app.use("/api/users/",router)
const PORT = process.env.port;


app.listen(PORT,()=>{
    console.log("Connect successfuly");
})