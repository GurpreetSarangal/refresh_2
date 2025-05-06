// routes/cryptoDataRoute.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const DATA_DIR = path.join(__dirname, "../cachedData");

router.get("/data/:type", (req, res) => {
  const { type } = req.params;
  const filePath = path.join(DATA_DIR, `${type}.json`);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Data not found" });
  }

  const data = fs.readFileSync(filePath, "utf-8");
  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

module.exports = router;
