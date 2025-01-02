const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

// Serve React build files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API Routes
const dataFile = path.join(__dirname, "jobs.json");

app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(data);
});

app.post("/api/data", (req, res) => {
  const newData = req.body;
  fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
  res.json({ message: "Data updated successfully!" });
});

// Fallback for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
