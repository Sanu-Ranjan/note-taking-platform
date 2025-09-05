const {
  generateAuthUrl,
  oauth2Client,
} = require("../services/googleAuthService");
const { googleClient } = require("../utils");
const crypto = require("crypto");

const isProd = process.env.NODE_ENV === "production";

const redirect = (req, res) => {
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
    const { code, error } = req.query;
    console.log(error);
    const { tokens } = await oauth2Client.getToken(code);

    const ticket = oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: googleClient.client_id,
    });

    console.log(ticket);
    res.send("login success");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  redirect,
  getUser,
};
