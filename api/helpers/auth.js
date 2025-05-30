var jwt = require("jsonwebtoken");
const { userSchema } = require("../models/user.model");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const verifyJWT = async (conn, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedJWT", decoded);
    const User = conn.model("User", userSchema);
    const userData = User.findOne({ username: decoded.username });
    console.log(userData);
  } catch (error) {
    throw error;
  }
};
module.exports = { createJWT, verifyJWT };
