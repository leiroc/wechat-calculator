const { Wechaty } = require('wechaty');
const CalcFunc = require('./lib/calculator.js');
const bot = new Wechaty();

function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, { small: false })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log('请扫码登录：\n', qrcodeImageUrl)
}



async function onLogin (user) {
  console.log(`${user} 登录成功`)
  // 给自己发消息
  let contact = await bot.Contact.find({ name:"Ray"});
  if(contact) {
      await contact.say('上线时间了');
  }
}

function onLogout(user) {
  console.log(`${user} 退出登录`)
}


async function onMessage (msg) {
  const contact = msg.from()
  let text = msg.text()
  const room = msg.room();

  if (room) return;
  if(msg.self()){ // 自己发消息
    return;
  }
  if (text) {
    text = text.replace(/[。，、,.]$/gi, '').replace(/\s*/gi, "");
  }
  if (msg.type() === bot.Message.Type.Text && /^\d+.{1}\d+/gi.test(text)) { // 文本消息
    let result = await CalcFunc.calculator(text);
    await msg.say(result+'');
  }
}

async function onFriendship () {
  console.log(`有人加我.`)
}


bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)
bot.on('friendship', onFriendship)

bot.start()
.then(() => console.log('正在开启微信机器人...'))
.catch(e => console.error(e))