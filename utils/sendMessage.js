const axios = require('axios');
require('dotenv').config();
// Serve static files
const express = require('express');
const path = require('path');
const app = express();

app.use('/images', express.static(path.join(__dirname, '../public/images')));
const sendMessage = async ({ phone, name, imageUrl, text }) => {
  const META_API = process.env.META_API;

  const payload = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    "template": {
      "name": "tnoa_general_secretary",
      "language": { "code": "en_US" },
      "components": [
        {
          "type": "header",
          "parameters": [
            {
              "type": "image",
              "image": {
                "link": "https://whatsapppromotion.onrender.com/images/drAtheek.jpg"
              }
            }
          ]
        }
      ]
    }
  };

  try {
    const response = await axios.post(META_API, payload, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Message sent to ${name} (${phone})`, response.data);
  } catch (error) {
  const errData = error.response?.data || error.message;
  console.error(`❌ Failed to send message to ${name} (${phone}):`, errData);
}
};
app.listen(3000, () => {
  console.log('✅ Static server running on http://localhost:3000');
});
module.exports = sendMessage;
