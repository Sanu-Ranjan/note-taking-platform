const jwt = require("jsonwebtoken");
const config = require("config");

let secret = process.env.JWT_SECRET;
let expiry = process.env.JWT_ASCESS_EXPIRES;

if (!secret) {
  console.log("fatal error: jwt secret not defined");
  process.exit(1);
}

function signToken(payload) {
  const token = jwt.sign(payload, config.get(secret), {
    expiresIn: expiry || "5d",
  });
  return token;
}

module.exports = {
  signToken,
};
