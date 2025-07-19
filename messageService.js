const recipients = require('./recipients.json');
const sendMessage = require('./utils/sendMessage');

const imageUrl = "https://thumbs.dreamstime.com/b/spring-flowers-blue-crocuses-drops-water-backgro-background-tracks-rain-113784722.jpg?w=768";
const messageText = "Hello {name}, don't miss out! 🗳️ Vote for our candidate and support change. Visit our center or call us!";

const sendPromotionalMessages = async () => {
 for (const user of users){
  for (const recipient of recipients) {
    await sendMessage({
      phone: recipient.phone,
      name: recipient.name,
      imageUrl,
      text: messageText,
      user: user
    });
  }
}
};

module.exports = sendPromotionalMessages;
