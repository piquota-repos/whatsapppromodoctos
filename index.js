require('dotenv').config();
require('./scheduler');
const express = require('express');
const path = require('path');
const app = express();
const VERIFY_TOKEN = "MY_SECRET_TOKEN";
app.use(express.json()); 
app.use(express.static("public"));
console.log("📲 WhatsApp Promo Scheduler Running...");
// ✅ Root route
app.get('/', (req, res) => {
  res.send('🚀 WhatsApp Promo Scheduler is live!');
});

const fs = require('fs');

// Helper function to log delivery status to a file
const logStatus = (recipientId, messageId, status) => {
  const logLine = `${new Date().toISOString()} - ${recipientId} - ${messageId} - ${status}\n`;
  fs.appendFileSync('delivery_log.txt', logLine);
};

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

// app.post('/webhook', (req, res) => {
//   const body = req.body;

//   // Log the full body (for testing)
//   console.log("📬 Webhook received:", JSON.stringify(body, null, 2));

//   // Your custom message status handler here 👇
//   if (body.entry?.[0]?.changes?.[0]?.value?.statuses) {
//     const status = body.entry[0].changes[0].value.statuses[0];
//     console.log("📡 Message status:", status.status, "for:", status.recipient_id);

//     if (status.errors) {
//       console.log("❌ Error:", JSON.stringify(status.errors, null, 2));
//     }
//   }

//   res.sendStatus(200); // Always respond with 200 OK
// });

app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.entry) {
    body.entry.forEach(entry => {
      const changes = entry.changes || [];
      changes.forEach(change => {
        const statuses = change.value?.statuses;
        if (statuses && statuses.length > 0) {
          const status = statuses[0];
          const recipient = status.recipient_id;
          const messageId = status.id;
          const statusValue = status.status;

          // Log to console
          console.log(`📬 Message to ${recipient} (${messageId}) is now '${statusValue}'`);

          // ✅ Log to file
          logStatus(recipient, messageId, statusValue);
        }
      });
    });
  }

  res.sendStatus(200);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
