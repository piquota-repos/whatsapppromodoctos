const recipients = require('./recipients.json');
const sendMessage = require('./utils/sendMessage');
const users = require('./users.json');
 
const sendPromotionalMessages = async () => {
 for (const user of users){
  for (const recipient of recipients) {
    await sendMessage({
      phone: recipient.phone,
      name: recipient.name,
      user: user
    });
  }
}
};
 
module.exports = sendPromotionalMessages;
 