function setStateCookie(res, state, isProd) {
  res.cookie("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 5 * 60 * 1000,
  });
}
module.exports = {
  setStateCookie,
};
