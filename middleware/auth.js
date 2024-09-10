const jwt = require("jsonwebtoken");
require("dotenv").config();
// const secreatkey=process.env.JWT_KEY;

function verfiyToken(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token not found.!" });
  }

  const token = authorization.split(" ")[1];
  // const token=req.header("Authorization")
  try {
    const verfiyToken = jwt.verify(token, "process.env.SECREAT_KEY");
    // console.log("jwt key in verify user :",verfiyToken);

    req.user = verfiyToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = verfiyToken;
