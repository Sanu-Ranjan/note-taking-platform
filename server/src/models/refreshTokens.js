const { database } = require("../db/databse");
const { DataTypes } = require("sequelize");

const RefreshTokens = database.define("refreshTokens", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tokenHash: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
  },
  replaceHash: {
    type: DataTypes.STRING(64),
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  revokedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = {
  RefreshTokens,
};
