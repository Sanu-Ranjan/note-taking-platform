const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const Subjects = database.define("subjects", {
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  subName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  Subjects,
};
