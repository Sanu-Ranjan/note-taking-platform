const express = require("express");
let app = express();
const { globalErrorHandler } = require("./utils/globalErrorHandler");
const cookieParser = require("cookie-parser");
const authentication = require("./routes/authentication");
const user = require("./routes/user");

const { notFoundHandler } = require("./middlewares/notFoundHandler");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authentication.router);
app.use("/api/v1/user", user.router);
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = {
  app,
};
