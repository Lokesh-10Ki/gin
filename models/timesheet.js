// models/Timesheet.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Timesheet = sequelize.define("Timesheet", {
  projectType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hours: {
    type: DataTypes.JSONB,
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
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Timesheet;
