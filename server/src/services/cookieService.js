function setStateCookie(res, state, isProd) {
  res.cookie("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 5 * 60 * 1000,
  });
}

function setJWTcookie(res, ascessToken, isProd) {
  const now = Date.now();
  res.cookie("JWT", ascessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    expires: new Date(now + 1000 * 60 * 60 * 24 * 3),
  });
}

function setRefreshTokenCookie(res, refreshToken, isProd) {
  const now = Date.now();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    expires: new Date(now + 1000 * 60 * 60 * 24 * 9),
  });
}

module.exports = {
  setStateCookie,
  setJWTcookie,
  setRefreshTokenCookie,
};
