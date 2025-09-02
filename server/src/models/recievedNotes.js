const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const Recievednotes = database.define("recievedNotes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
module.exports = {
  Recievednotes,
};
