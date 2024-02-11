const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hi!!!");
});

app.post("/api/postData", (req, res) => {
  const data = req.body;
  console.log("Data received:", data);

  const filePath = path.join(__dirname, "data.json");
  
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing data to file:", err);
      res.status(500).json({ error: "Error writing data to file" });
    } else {
      console.log("Data written to file successfully");
      res.json({ message: "Data updated and saved to file successfully" });
    }
  });
});

app.get("/api/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json:", err);
      res.status(500).send("Internal Server Error");
      return;
      }
      console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
});

app.delete("/api/deleteData", (req, res) => {
  try {
    console.log(new Date().toISOString());
    // Clear the contents of the db.json file
    fs.writeFileSync(
      "data.json",
      JSON.stringify([
        {
          projectType: "BAU Activity",
          projectName: "",
          task: "",
          comment: "",
          hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
          total: 0,
        },
        {
          projectType: "Sales Activity",
          projectName: "",
          task: "",
          comment: "",
          hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
          total: 0,
        },
        {
          "Project Type": "Total Hours",
          total: {
            overall: 0,
            mon: 0,
            tue: 0,
            wed: 0,
            thu: 0,
            fri: 0,
            sat: 0,
            sun: 0,
          },
        },
        {
          startDate: new Date().toISOString(),
        },
      ])
    );
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
