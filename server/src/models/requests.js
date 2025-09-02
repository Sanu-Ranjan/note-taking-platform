const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const Requests = database.define("requests", {
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  fromUser: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});

module.exports = {
  Requests,
};
