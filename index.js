require('dotenv').config();
require('./scheduler');
const express = require('express');
const path = require('path');
const app = express();
const VERIFY_TOKEN = "MY_SECRET_TOKEN";
app.use(express.static("public"));
console.log("📲 WhatsApp Promo Scheduler Running...");
// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 WhatsApp Promo Scheduler is live!');
});
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('✅ Webhook verified successfully!');
            res.status(200).send(challenge);
        } else {
            console.warn('❌ Webhook verification failed. Tokens did not match.');
            res.sendStatus(403);
        }
    } else {
        res.status(400).send('Missing mode or token');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
