require("dotenv").config();
const googleClient = {
  web: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uris: [process.env.GOOGLE_REDIRECT_URI],
    javascript_origins: [process.env.GOOGLE_JS_ORIGINS],
  },
};

(function () {
  for (let key in googleClient.web) {
    if (!googleClient.web[key]) {
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
