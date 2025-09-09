const { where, Sequelize } = require("sequelize");
const { RefreshTokens } = require("../models");
const {
  setStateCookie,
  setRefreshTokenCookie,
  setJWTcookie,
} = require("../services/cookieService");
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
const dayjs = require("dayjs");
const { database } = require("../db/databse");

const isProd = process.env.NODE_ENV === "production";

const consentRedirect = (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  setStateCookie(res, state, isProd);
  res.redirect(generateAuthUrl(state));
};

const getUser = async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (error) {
      console.log(`Google Auth error: ${error}`);
      return res.status(400).json(sendResponse.fail("Google Auth error"));
    }

    if (!state || state !== req.cookies.oauth_state) {
      return res.status(400).json(sendResponse.fail("Invalid State"));
    }

    const profile = await getUserProfile(code, res);

    let user = await upsertUser(profile);

    const ascessToken = signToken({ id: user.id });
    const refToken = refreshToken();

    await saveRefreshToken(refToken, user.id);

    setRefreshTokenCookie(res, refToken, isProd);
    setJWTcookie(res, ascessToken, isProd);

    res.send("Login successful");
  } catch (error) {
    console.log(error);
    res.status(500).json(sendResponse.fail("Oauth_failed"));
  }
};

const rotateRefreshToken = async (req, res) => {
  try {
    let oldToken = req.cookies?.refreshToken;
    if (!oldToken) {
      console.log("Missing refresh token");
      return res.status(401).json(sendResponse.fail("Invalid"));
    }

    const oldHAsh = crypto.createHash("sha256").update(oldToken).digest("hex");

    const rt = await RefreshTokens.findOne({ where: { tokenHash: oldHAsh } });
    if (!rt) {
      console.log("Refresh token not found");
      return res.status(401).json(sendResponse.fail("Invalid"));
    }

    const isExpired = dayjs(rt.expiresAt).isBefore(dayjs());

    if (isExpired) {
      console.log("refresh token expired");
      return res.status(401).json(sendResponse.fail("Invalid"));
    }

    if (rt.revokedAt) {
      console.log("The refresh token is revoked");
      await RefreshTokens.update(
        { revokedAt: new Date() },
        {
          where: {
            userId: rt.userId,
            revokedAt: null,
          },
        }
      );
      return res.status(401).json(sendResponse.fail("Invalid"));
    }

    const newAscessToken = signToken({ id: rt.userId });
    const newrefreshToken = refreshToken;
    const newRefreshHash = crypto
      .createHash("sha256")
      .update(newrefreshToken)
      .digest("hex");
    const expiresAt = rt.expiresAt;

    await database.transaction(async (t) => {
      await rt.update(
        {
          revokedAt: new Date(),
          replaceHash: newRefreshHash,
        },
        { transaction: t }
      );
      await RefreshTokens.create({
        tokenHash: newRefreshHash,
        expiresAt: expiresAt,
        userId: rt.userId,
      });
    });

    setJWTcookie(res, newAscessToken, isProd);
    setRefreshTokenCookie(res, newrefreshToken, isProd);
  } catch (error) {
    console.log(error);
    res.status(500).json(sendResponse.fail("refresh_failed"));
  }
};

const logOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const refreshHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const rt = await RefreshTokens.findOne({
      where: { tokenHash: refreshHash },
    });

    await rt.update({ revokedAt: new Date() });

    res.clearCookie("refreshToken");
    res.clearCookie("JWT");

    res.json(sendResponse.success("logged_out"));
  } catch (error) {
    console.log(error);
    res.status(500).json("logout error");
  }
};

module.exports = {
  consentRedirect,
  getUser,
  rotateRefreshToken,
  logOut,
};
