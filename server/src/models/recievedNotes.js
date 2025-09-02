const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const Recievednotes = database.define("recieved", {
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
});
module.exports = {
  Recievednotes,
};
