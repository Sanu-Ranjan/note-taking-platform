const express = require("express");
let app = express();

if (app.get("env") === "development") {
  require("dotenv").config();
  console.log("ENV: Development");
}

const { database } = require("./db/databse");

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const port = process.env.PORT || 3000;
database.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`listening on port:${port}`);
  });
});
