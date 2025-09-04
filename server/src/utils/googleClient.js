require("dotenv").config();
const googleClient = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
};

(function () {
  for (let key in googleClient) {
    if (!googleClient[key]) {
      console.log(
        `Fatal error: Google ${key} not defined, refer .env.examples`
      );
      process.exit(1);
    }
  }
})();

module.exports = {
  googleClient,
};
