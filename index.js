require('dotenv').config();
require('./scheduler');
const express = require('express');
const path = require('path');
const app = express();
console.log("📲 WhatsApp Promo Scheduler Running...");
