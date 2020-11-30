"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stock.belongsTo(models.Portfolio, { foreignKey: "portfolioId" });
    }
  }
  Stock.init(
    {
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "CASH",
      },
      quatity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50000,
      },
      priceAcquired: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 50000,
      },
      dataAcquired: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      portfolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Portfolios" },
      },
    },
    {
      sequelize,
      modelName: "Stock",
    }
  );
  return Stock;
};
