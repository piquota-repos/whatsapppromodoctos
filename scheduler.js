const cron = require('node-cron');
const sendPromotionalMessages = require('./messageService');

cron.schedule('25 18 * * *', async () => {
  console.log("⏰ Running scheduled WhatsApp promotional messages...");
  await sendPromotionalMessages();
});
