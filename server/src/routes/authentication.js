const { redirect } = require("../controllers/authentication");

const router = require("express").Router();

router.get("/google", redirect);
//router.post("/google/callback",getUser);
//router.post("/refresh",);
//router.post("/logout",);
module.exports = {
  router,
};
