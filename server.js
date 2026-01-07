const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

/* In-memory log storage */
const logs = [];

/* Test route */
app.get("/", (req, res) => {
  res.send("Backend alive ✅");
});

/* Receive attack logs */
app.post("/log", (req, res) => {
  logs.push({
    ...req.body,
    time: new Date().toISOString()
  });
  res.json({ success: true });
});

/* Send logs to admin panel */
app.get("/logs", (req, res) => {
  res.json(logs);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
