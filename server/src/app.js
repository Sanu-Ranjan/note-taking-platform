const express = require("express");
let app = express();
const { globalErrorHandler } = require("./utils/globalErrorHandler");
const cookieParser = require("cookie-parser");
const authentication = require("./routes/authentication");
const subjects = require("./routes/subjects");
const notes = require("./routes/notes");
const requests = require("./routes/request");
const { notFoundHandler } = require("./middlewares/notFoundHandler");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authentication.router);
app.use("/api/v1/subjects", subjects.router);
app.use("/api/v1/notes", notes.router);
app.use("/api/v1/requests", requests.router);
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = {
  app,
};
