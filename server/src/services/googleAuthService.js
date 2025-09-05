const { googleClient } = require("../utils");

const { OAuth2Client } = require("google-auth-library");

const oauth2Client = new OAuth2Client({
  clientId: googleClient.client_id,
  clientSecret: googleClient.client_secret,
  redirectUri: googleClient.redirect_uris,
});
function generateAuthUrl(state) {
  return oauth2Client.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
    state: state,
  });
}

module.exports = {
  generateAuthUrl,
  oauth2Client,
};
