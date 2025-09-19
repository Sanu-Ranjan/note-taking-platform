const { app } = require("./app");

const { database } = require("./db/databse");
require("./models");

//app.get("env") === "development" && require("dotenv").config();

const port = process.env.PORT || 3000;
(async function () {
  try {
    await database.sync({ force: false });
    app.listen(port, () => {
      console.log(`listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
