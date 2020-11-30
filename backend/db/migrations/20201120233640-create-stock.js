"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Stocks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      symbol: {
        allowNull: false,
        type: Sequelize.STRING(10),
        defaultValue: "CASH",
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 50000,
      },
      priceAcquired: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 1.0,
      },
      dateAcquired: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      portfolioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Portfolios" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Stocks");
  },
};
