const { Sequelize } = require("sequelize");
const config = require("config");
require("../utils/configValidator");
const isProduction = process.env.NODE_ENV === "production";

const database = new Sequelize(
  config.get("mysqlDB.database"),
  config.get("mysqlDB.user"),
  config.get("mysqlDB.password"),
  {
    host: config.get("mysqlDB.host"),
    port: config.get("mysqlDB.port"),
    dialect: "mysql",
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: true,
            ca: config.get("mysqlDB.ssl").replace(/\\n/g, "\n"),
          },
        }
      : {},
  }
);

(async () => {
  try {
    await database.authenticate();
    console.log("connection to database server has been extablished");

    const [result] = await database.query(
      "SHOW SESSION STATUS LIKE 'Ssl_cipher'"
    );
    console.log("SSL Cipher:", result[0]?.Value || "Not using SSL");
  } catch (error) {
    console.log("Unable to connect to data base: ", error);
    process.exit(1);
  }
})();

module.exports = {
  database,
};
