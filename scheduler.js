const cron = require('node-cron');
const sendPromotionalMessages = require('./messageService');

cron.schedule(' 52 20 * * *', async () => {
  console.log("⏰ Running scheduled WhatsApp promotional messages...");
  await sendPromotionalMessages();
});
