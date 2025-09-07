const { RefreshTokens } = require("../models");
const { setStateCookie } = require("../services/cookieService");
const {
  generateAuthUrl,
  getUserProfile,
} = require("../services/googleAuthService");
const {
  signToken,
  refreshToken,
  saveRefreshToken,
} = require("../services/tokenService");
const { upsertUser } = require("../services/userServices");
const { sendResponse } = require("../utils");
const crypto = require("crypto");

const isProd = process.env.NODE_ENV === "production";

const consentRedirect = (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  setStateCookie(res, state, isProd);
  res.redirect(generateAuthUrl(state));
};

const getUser = async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (!state || state !== req.cookies.oauth_state) {
      return res.status(400).json(sendResponse.fail("Invalid State"));
    }

    const profile = await getUserProfile(code, res);

    let user = await upsertUser(profile);

    const ascessToken = signToken({ id: user.id });
    const refToken = refreshToken();

    await saveRefreshToken(refToken, user.id);

    const now = Date.now();
    res.cookie("refreshToken", refToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      expires: new Date(now + 1000 * 60 * 60 * 24 * 9),
    });
    res.cookie("JWT", ascessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      expires: new Date(now + 1000 * 60 * 60 * 24 * 3),
    });
    res.send("Login successful");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  consentRedirect,
  getUser,
};
