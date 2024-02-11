"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the "Timesheets" table
    await queryInterface.createTable("Timesheets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      task: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hours: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0,
        },
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    // Drop the "Timesheets" table if it exists
    await queryInterface.dropTable("Timesheets");
  },
};
