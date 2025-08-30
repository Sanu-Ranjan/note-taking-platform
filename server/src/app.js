const express = require("express");
let app = express();

if (app.get("env") === "development") {
  require("dotenv").config();
  console.log("working");
}

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("BAckend is running");
});

app.listen(port, () => {
  console.log(`listening on port:${port}`);
});
