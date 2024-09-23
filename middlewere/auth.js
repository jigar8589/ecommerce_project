const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// function verifyTokenPromises(req,res,next){

//   try {

//     const token = req.headers;
//     const jwtSecretKey = promises.env.secratekey
//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) {
//         res.send("Successfully Verified");
//         next()
//     } else {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// } catch (error) {
//     // Access Denied
//     console.log(error)
//     return res.status(401).send(error);

// }

// }

const verifyTokenPromise = (token, key, options) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, options, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};


const authentications =  async (req, res, next) => {
  try {
  const  authorization  = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header is not provided" });
  }

  const token = authorization.split(" ")[1]
  const key = process.env.JWT_SECRECT;
  if (!token) return res.status(401).json({ error: "Token is not provided" });
 
    const payload = await verifyTokenPromise(token, key, {
      ignoreExpiration: false,
    });

  
    
    const user = await User.findOne({ _id: payload.userId });
   
    if (!user) {
      return res.status(403).json({ error: "Invalid Token..." });
    }
   
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = authentications