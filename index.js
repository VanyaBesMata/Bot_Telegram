const TelegrambotApi = require('node-telegram-bot-api')
const token = '5206997189:AAEQtgDzUXXFr21W2DL-49PMIeEKhp7x00s'
const bot = new TelegrambotApi(token, {polling: true})
const chats = {}
const Optionsgame = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
      [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
      [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
      [{text: '0', callback_data: '0'}]
    ]
  })
}
const Optionsagain = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Попробовать снова', callback_data: "/again"}]
    ]
  })
}
const startGame = async (chatID) => {
  await bot.sendMessage(chatID, `Я загадываю цифру, от 0 до 9, попробуй угадать)`)
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatID] = randomNumber;
  await bot.sendMessage(chatID, `Отгадывай)`, Optionsgame)
}

bot.setMyCommands([
  {command: "/start", description: "Приветствие"},
  {command: "/info", description: "Информация о боте"},
  {command: "/game1", description: "Игра: бот загадывает цифру от 0 до 9, а вы угадываете"}
])

bot.on('message', msg => {
  const text = msg.text;
  const chatID = msg.chat.id;

  if (text === "/start") {
    return bot.sendMessage(chatID, `Приветсвую тебя ${msg.from.first_name} ${msg.from.last_name}, напиши /info, чтобы продолжить`)
  }
  if (text === "/info") {
    return bot.sendMessage(chatID, `Тут ты можешь скоротать  свое время, этот бот наполнен разнообразными минииграми, выбери свою и играй`)
  }
  if (text === "/game1") {
    return startGame(chatID);
  }
})

bot.on('callback_query', async msg => {
  const data = msg.data;
  const chatID = msg.message.chat.id;
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatID] = randomNumber;

  if (data === "/again") {
    return startGame(chatID);
  }
  if ( data === chats[chatID]) {
    await bot.sendMessage(chatID, `Поздравляю, ты угадал цифру ${chats[chatID]}`, Optionsagain)
  } else {
    await bot.sendMessage(chatID, `К сожалению, ты не угадал, бот загадал цифру ${chats[chatID]}`, Optionsagain)
  }
})
