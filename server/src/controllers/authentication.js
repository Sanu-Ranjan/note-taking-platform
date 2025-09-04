const { url } = require("../services/googleAuthService");

const redirect = async (req, res) => {
  res.redirect(url);
};

module.exports = {
  redirect,
};
