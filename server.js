const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* 🧠 IN-MEMORY LOG STORE */
const logs = [];

/* ROOT TEST */
app.get("/", (req, res) => {
  res.send("Backend alive ✅");
});

/* LOG ENDPOINT */
app.post("/log", (req, res) => {
  console.log("🔥 LOG RECEIVED:", req.body);

  logs.push({
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    body: req.body,
    time: new Date().toISOString()
  });

  res.json({ status: "logged", total: logs.length });
});

/* ADMIN VIEW */
app.get("/admin/logs", (req, res) => {
  res.json(logs);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
