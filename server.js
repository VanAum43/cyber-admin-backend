const express = require("express");
const cors = require("cors");

const app = express();

/* ✅ ALLOW GITHUB PAGES (IMPORTANT) */
app.use(cors({
  origin: "*",   // OK for learning; restrict in production
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* 🧠 IN-MEMORY LOG STORE (Render-safe) */
const logs = [];

/* ✅ ROOT TEST */
app.get("/", (req, res) => {
  res.send("Backend alive ✅");
});

/* ✅ LOG ENDPOINT (CALLED FROM WEBSITE) */
app.post("/log", (req, res) => {
  console.log("🔥 LOG RECEIVED:", req.body);

  logs.push({
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    action: req.body.action || "unknown",
    page: req.body.page || "unknown",
    time: new Date().toISOString()
  });

  res.json({ status: "logged", total: logs.length });
});

/* ✅ ADMIN PANEL FETCH */
app.get("/admin/logs", (req, res) => {
  res.json(logs);
});

/* ✅ RENDER PORT FIX */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
