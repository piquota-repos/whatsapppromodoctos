require('dotenv').config();
require('./scheduler');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static("public"));
console.log("📲 WhatsApp Promo Scheduler Running...");
// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 WhatsApp Promo Scheduler is live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
