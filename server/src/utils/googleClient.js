const googleClient = {
  web: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    project_id: "learning-backend-dev-469417",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
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
