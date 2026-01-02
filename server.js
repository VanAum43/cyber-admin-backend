const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ ROOT CHECK ROUTE (Fixes "Cannot GET /") */
app.get("/", (req, res) => {
  res.send("Cyber Admin Backend is running ✅");
});

/* ✅ LOG COLLECTION ROUTE */
app.post("/log", (req, res) => {
  const log = {
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    action: req.body.action,
    page: req.body.page,
    time: new Date().toISOString()
  };

  fs.appendFileSync("logs.json", JSON.stringify(log) + ",\n");
  res.json({ status: "logged" });
});

/* ✅ ADMIN PANEL LOG FETCH */
app.get("/admin/logs", (req, res) => {
  if (!fs.existsSync("logs.json")) {
    return res.json([]);
  }

  const data = fs.readFileSync("logs.json", "utf-8").trim();
  if (data === "") {
    return res.json([]);
  }

  res.json(JSON.parse("[" + data.slice(0, -1) + "]"));
});

/* 🚨 IMPORTANT FOR RENDER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
process.env.PORT
