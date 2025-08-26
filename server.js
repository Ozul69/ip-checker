const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  // Get visitor IP
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

  console.log(`Visitor IP: ${ip}`);

  const fs = require("fs");
  fs.appendFileSync("visitors.log", `Visitor IP: ${ip}\n`);

  res.send("Hello visitor!");
});

app.listen(PORT, () => {
  console.log(`IP Checker running at http://localhost:${PORT}`);
});
