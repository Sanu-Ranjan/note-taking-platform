const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const Notes = database.define("notes", {
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

module.exports = {
  Notes,
};
