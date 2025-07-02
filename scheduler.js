const cron = require('node-cron');
const sendPromotionalMessages = require('./messageService');

cron.schedule(' * * * * *', async () => {
  console.log("⏰ Running scheduled WhatsApp promotional messages...");
  await sendPromotionalMessages();
});
