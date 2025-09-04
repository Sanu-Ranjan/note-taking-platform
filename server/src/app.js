const express = require("express");
let app = express();
//app.get("env") === "development" && require("dotenv").config();
const { database } = require("./db/databse");
require("./models");
const { globalErrorHandler } = require("./utils/globalErrorHandler");

const authentication = require("./routes/authentication");

app.use(express.json());

app.use("/api/v1/auth", authentication.router);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
(async function () {
  try {
    await database.sync({ force: true });
    app.listen(port, () => {
      console.log(`listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
