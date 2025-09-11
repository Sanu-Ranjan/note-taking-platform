const { authenticate } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/users", authenticate, (req, res) => {
  res.send(`user: ${req.user.id}`);
});

module.exports = {
  router,
};
