const cron = require('node-cron');
const sendPromotionalMessages = require('./messageService');

cron.schedule(' 0 * * * *', async () => {
  console.log("⏰ Running scheduled WhatsApp promotional messages...");
  await sendPromotionalMessages();
});
