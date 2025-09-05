const jwt = require("jsonwebtoken");

let secret = process.env.JWT_SECRET;
let expiry = process.env.JWT_ASCESS_EXPIRES;

if (!secret) {
  console.log("fatal error: jwt secret not defined");
  process.exit(1);
}

function signToken(payload) {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiry || "5d",
  });
  return token;
}

module.exports = {
  signToken,
};
