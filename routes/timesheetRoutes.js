// routes/timesheetRoutes.js
const express = require("express");
const router = express.Router();
const timesheetController = require("../controllers/timesheetController");

// Define routes
router.get("/timesheets", timesheetController.getAllTimesheets);
router.post("/timesheets", timesheetController.createTimesheet);
// Add other routes as needed (e.g., PUT, DELETE)

module.exports = router;
