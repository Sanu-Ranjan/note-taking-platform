const { sendResponse } = require("../utils");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.JWT;

  if (!token) return res.status(401).json(sendResponse.fail("missing_token"));

  const secret = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(sendResponse.fail("Invalid token"));
  }
};

module.exports = {
  authenticate,
};
