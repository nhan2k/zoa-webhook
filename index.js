const express = require("express");
const cors = require("cors");
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000!");
});

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

app.get("/zalo", (req, res) => {
  const { code, oa_id } = req.query;

  // Listen for any kind of message. There are different kinds of
  // messages.
  const chatId = process.env.CHAT_ID;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `code : ${code}`);

  return res.status(200);
});
