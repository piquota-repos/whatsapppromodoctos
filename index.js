require('dotenv').config();
require('./scheduler');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static("public"));
console.log("📲 WhatsApp Promo Scheduler Running...");
