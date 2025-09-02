const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const Requests = database.define("requests", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fromUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  Requests,
};
