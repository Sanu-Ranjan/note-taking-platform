const express = require("express");
let app = express();

if (app.get("env") === "development") {
  require("dotenv").config();
  console.log("ENV: Development");
}

require("./models");

const { database } = require("./db/databse");

app.get("/", (req, res) => {
  res.send("Backend is running");
});

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
