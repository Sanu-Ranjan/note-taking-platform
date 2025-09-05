const { Users } = require("../models");
const {
  generateAuthUrl,
  oauth2Client,
  verifyIdToken,
} = require("../services/googleAuthService");
const { signToken, refreshToken } = require("../services/tokenService");
const { upsertUser } = require("../services/userServices");

const { sendResponse } = require("../utils");
const crypto = require("crypto");

const isProd = process.env.NODE_ENV === "production";

const consentRedirect = (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  res.cookie("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 5 * 60 * 1000,
  });
  res.redirect(generateAuthUrl(state));
};

const getUser = async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (!state || state !== req.cookies.oauth_state) {
      return res.status(400).json(sendResponse.fail("Invalid State"));
    }

    const { tokens } = await oauth2Client.getToken(code);

    const ticket = await verifyIdToken(tokens);

    const isVerified = ticket.getPayload().email_verified;
    if (!isVerified)
      return res.status(400).json(sendResponse.fail("Email not verified"));

    const profile = {
      name: ticket.getPayload().name,
      email: ticket.getPayload().email,
    };

    let user = await upsertUser(profile);

    const ascessToken = signToken({ id: user.id });
    const refToken = refreshToken();

    res.send("login success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  consentRedirect,
  getUser,
};
