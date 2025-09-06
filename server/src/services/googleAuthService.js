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

async function verifyIdToken(tokens) {
  return await oauth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: googleClient.client_id,
  });
}

async function getUserProfile(code, res) {
  const { tokens } = await oauth2Client.getToken(code);

  const ticket = await verifyIdToken(tokens);

  const isVerified = ticket.getPayload().email_verified;
  if (!isVerified)
    return res.status(400).json(sendResponse.fail("Email not verified"));

  const profile = {
    name: ticket.getPayload().name,
    email: ticket.getPayload().email,
  };
  return profile;
}

module.exports = {
  generateAuthUrl,
  oauth2Client,
  verifyIdToken,
  getUserProfile,
};
