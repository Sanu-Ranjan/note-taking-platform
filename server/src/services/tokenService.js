const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dayjs = require("dayjs");
const { RefreshTokens } = require("../models");

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

function refreshToken() {
  return crypto.randomBytes(64).toString("base64url");
}

async function saveRefreshToken(refreshToken, id) {
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const expiresAt = dayjs()
    .add(Number(process.env.REFRESH_TOKEN_EXPIRES || 9), "day")
    .toDate();

  await RefreshTokens.create({
    userId: id,
    tokenHash: tokenHash,
    expiresAt: expiresAt,
  });
}

module.exports = {
  signToken,
  refreshToken,
  saveRefreshToken,
};
