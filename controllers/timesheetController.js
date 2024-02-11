// controllers/timesheetController.js
const Timesheet = require("../models/Timesheet");

// Controller functions for Timesheet model
exports.getAllTimesheets = async (req, res) => {
  try {
    const timesheets = await Timesheet.findAll();
    res.json(timesheets);
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    res.status(500).json({ error: "Error fetching timesheets" });
  }
};

exports.createTimesheet = async (req, res) => {
  try {
    const newTimesheet = await Timesheet.create(req.body);
    res.status(201).json(newTimesheet);
  } catch (error) {
    console.error("Error creating timesheet:", error);
    res.status(500).json({ error: "Error creating timesheet" });
  }
};

// Add other controller functions as needed (e.g., updateTimesheet, deleteTimeshee
