const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local');

const { addSettings, unsubscribe } = require('./utils/settings');
const { userTelegramNotify } = require('./utils/tasks');
const { emailReg } = require('./utils/regexp');

require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);
bot.use((new LocalSession({ database: 'example_db.json' })).middleware());

const commands = [{
  command: 'subscribe',
  description: 'подписаться на уведомления'
}, {
  command: 'unsubscribe',
  description: 'отписаться от уведомлений'
}];

const methodChecking = (ctx) => {
  let string = `Не знаю такой команды, вот список доступных команд \n`;
  if (!!commands.length) {
    commands.forEach((elem, i) => {
      string += `\/${elem.command} - ${elem.description}`;
      if (i !== commands.length - 1) {
        string += '\n';
      }
    });
    ctx.reply(string);
  }
};

const mailCheck = (ctx) => {
  let string = `Не знаю такой команды, вот список доступных команд \n`;
  if (!!commands.length) {
    commands.forEach((elem, i) => {
      string += `\/${elem.command} - ${elem.description}`;
      if (i !== commands.length - 1) {
        string += '\n';
      }
    })
    ctx.reply('Неверный формат почты');
  }
};

const sender = async (tgChatId, elem) => {
  const date = new Date(elem.targetDateTime).toLocaleString();
  await bot.telegram.sendMessage(tgChatId, `Внимание! Событие: ${elem.title}, содержание события: ${elem.textContent} произойдёт: ${date}`);
  await fetch(`http://localhost:5000/api/tg/confirm/${elem.taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

userTelegramNotify(sender);

// функция проверки email
const subscribe = async (ctx) => {
  const tgChatId = ctx.message.chat.id;
  const text = ctx.message.text;
  const userName = ctx.message.chat.username;
  if (emailReg.test(text)) {
    const result = await addSettings(text, userName, tgChatId, sender);
    ctx.reply(result);
  } else {
    mailCheck(ctx);
  }
};

const unsubscribeUser = async (ctx) => {
  const text = ctx.message.text;
  if (emailReg.test(text)) {
    const result = await unsubscribe(text);
    ctx.reply(result);
  } else {
    mailCheck(ctx);
  }
};

bot.command('start', (ctx) => {
  const userName = ctx.message.chat.username;
  ctx.session.startProcessSubscribe = false;
  ctx.session.startProcessUnSubscribe = false;

  let str = `Привет ${userName}, я бот помощник, именно я буду напоминать тебе о твоих запланированных задачах. Если вы ещё не подписаны пожалуйста подпишитесь. \n`;
  if (!!commands.length) {
    commands.forEach((elem, i) => {
      str += `\/${elem.command} - ${elem.description}`;
      if (i !== commands.length - 1) {
        str += '\n';
      }
    });
    ctx.reply(str);
  }
});

bot.command('subscribe', async (ctx) => {
  ctx.session.startProcessSubscribe = true;
  ctx.session.startProcessUnSubscribe = false;
  return ctx.reply('Чтобы подписаться на уведомления нужно ввести email');
});

bot.command('unsubscribe', async (ctx) => {
  ctx.session.startProcessSubscribe = false;
  ctx.session.startProcessUnSubscribe = true;
  return ctx.reply('Чтобы отписаться от уведомлений нужно ввести email');
});

bot.on('text', async (ctx, next) => {
  if (ctx.session.startProcessSubscribe) {
   return await subscribe(ctx);
  }

  if (ctx.session.startProcessUnSubscribe) {
    return await unsubscribeUser(ctx);
  }

  methodChecking(ctx);
  return next();
})

bot.launch().then(() => console.log('Бот жив'));
