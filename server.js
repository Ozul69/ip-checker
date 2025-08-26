const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  // Get visitor IP (accounting for proxies)
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Make a log entry with timestamp
  const logEntry = `[${new Date().toISOString()}] Visitor IP: ${ip}\n`;
  fs.appendFileSync("visitors.log", logEntry);

  // Show the visitor their IP
  res.send(`
    <html>
      <head><title>IP Checker</title></head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1>Your IP is: ${ip}</h1>
        <p>We logged your visit at ${new Date().toLocaleString()}</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`IP Checker running at http://localhost:${PORT}`);
});
