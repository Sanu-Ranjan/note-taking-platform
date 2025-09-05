const { consentRedirect, getUser } = require("../controllers/authentication");

const router = require("express").Router();

router.get("/google", consentRedirect);
router.get("/google/callback", getUser);
//router.post("/refresh",);
//router.post("/logout",);
module.exports = {
  router,
};
