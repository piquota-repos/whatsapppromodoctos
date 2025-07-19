const { google } = require("googleapis");
require('dotenv').config();
const keys = process.env.CREDENTIALS // Google Service Account creds

async function appendToSheet(data) {
    console.log("reached");
    console.log(data);
  const auth = new google.auth.GoogleAuth({
    keyFile: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: '1eOpru44UqIji4zh5McSl6nF4L9ZhUuCWIkeV0sxz9ns',
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[data.name, data.mobile, data.message]],
    },
  });
}

module.exports = { appendToSheet };
