const { url, oauth2Client } = require("../services/googleAuthService");
const { googleClient } = require("../utils");

const redirect = (req, res) => {
  res.redirect(url);
};

const getUser = async (req, res) => {
  try {
    const { code, error } = req.query;
    console.log(error);
    const { tokens } = await oauth2Client.getToken(code);

    const ticket = await oauth2Client.verifyIdToken({
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
