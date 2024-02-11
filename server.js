const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const mongoose = require("mongoose");
const app = express();
const port = 3000;
const { MongoClient } = require("mongodb");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

const withDB = async (operations) => {
  const mongoURL = process.env.MONGO_URL;

  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db("JIN");
    console.log("Database connected succesfully");
    const result = await operations(db);
    client.close();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hi!!!");
});

//Adds document in timesheets colection
app.post("/addData", async (req, res) => {
  const { weekStartDate, BAURows, salesRows, total } = req.body;
  console.log(req.body);

  // Validate that data is provided
  if (!req.body) {
    console.log("if condition");
    return res.status(400).json({ message: "Invalid data provided." });
  }

  try {
    const result = await withDB(async (db) => {
      const timesheetCollection = db.collection("timesheets");

      // Check if data for this week already exists
      const existingData = await timesheetCollection.findOne({ weekStartDate });

      if (existingData) {
        // Update existing data for this week
        await timesheetCollection.updateOne(
          { weekStartDate },
          { $set: { BAURows, salesRows, total } }
        );
        console.log("Updated with existing data.");
      } else {
        // Insert new data for this week
        await timesheetCollection.insertOne({
          weekStartDate,
          BAURows,
          salesRows,
          total,
        });
        console.log("Data added successfully");
      }

      return { status: 201, message: "Data saved successfully." };
    });

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Returns all documents in the timesheets collection
app.get("/getData", async (req, res) => {
  try {
    const result = await withDB(async (db) => {
      const timesheetCollection = db.collection("timesheets");

      
      const allTimesheetData = await timesheetCollection.find({}).toArray();

      if (!allTimesheetData) {
        console.log("No data to send");
        return res.status(404).json({ message: "No timesheet data found" });
      }
      console.log("Data sent successfully");
      return res.status(200).json(allTimesheetData);
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching timesheet data" });
  }
});

// Delete data with the specified weekStartDate
app.delete("/timesheet/delete/:weekStartDate", async (req, res) => {
  const { weekStartDate } = req.params;

  try {
    const result = await withDB(async (db) => {
      const timesheetCollection = db.collection("timesheets");

      
      const deletionResult = await timesheetCollection.deleteOne({
        weekStartDate,
      });

      if (deletionResult.deletedCount === 0) {
        return {
          status: 404,
          message: "Data not found for the specified weekStartDate.",
        };
      }

      return { status: 200, message: "Data deleted successfully." };
    });

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.listen(port, () => {
  console.log(` Server listening at http://localhost:${port}`);
});
