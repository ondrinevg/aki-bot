const express = require('express');
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const gamesRouterAPI = require('./routers/gamesRouterAPI');

const bot = new Telegraf(process.env.BOT_TOKEN);
app.locals.DB = new Map();

function getMainMenu() {
  return Markup.keyboard([
    ['Да', 'Нет'],    
    ['Не знаю', 'Возможно'],
    ['Скорее нет'],
  ]).resize().extra();
}

bot.start(ctx => {
  const { id } = ctx.message.from;
  app.locals.DB.delete(+id);
  ctx.reply(`Привет, ${ctx.message.from.first_name}!\n\/game для старта игры`, getMainMenu());
})


bot.hears('\/game', async (ctx) => {
  const { id, first_name } = ctx.message.from;
  const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      first_name,
    }),
  })
  if (response.status === 200) {
    const resBody = await response.json();
    ctx.reply(`Задумайте персонажа и смело отвечайте на вопрос (рекомендую использовать предустановленные кнопки ответов в меню): ${resBody.question}`);
  }
});

bot.hears('Да', async (ctx) => {
  const { id } = ctx.message.from;
  if (app.locals.DB.get(+id)) {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: '0',
      }),
    })
    if (response.status === 200) {
      const resBody = await response.json();
      if (+resBody.progress >= 70 || +resBody.currentStep >= 78) {
        const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}/win`);
        if (response.status === 200) {
          const resBody = await response.json();
          ctx.replyWithPhoto(resBody.answers[0].absolute_picture_path)
          ctx.reply(`Это: ${resBody.answers[0].name}, количество альтернативных вариантов ${resBody.guessCount}`);
        }
      } else ctx.reply(`${resBody.question}`);
    }
  } else ctx.reply(`Для старта новой игры набери \/game`);
});

bot.hears('Нет', async (ctx) => {
  const { id } = ctx.message.from;
  if (app.locals.DB.get(+id)) {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: '1',
      }),
    })
    if (response.status === 200) {
      const resBody = await response.json();
      if (+resBody.progress >= 70 || +resBody.currentStep >= 78) {
        const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}/win`);
        if (response.status === 200) {
          const resBody = await response.json();
          ctx.replyWithPhoto(resBody.answers[0].absolute_picture_path)
          ctx.reply(`Это: ${resBody.answers[0].name}, количество альтернативных вариантов ${resBody.guessCount}`);
        }
      } else ctx.reply(`${resBody.question}`);
    }
  } else ctx.reply(`Для старта новой игры набери \/game`);
});

bot.hears('Не знаю', async (ctx) => {
  const { id } = ctx.message.from;
  if (app.locals.DB.get(+id)) {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: '2',
      }),
    })
    if (response.status === 200) {
      const resBody = await response.json();
      if (+resBody.progress >= 70 || +resBody.currentStep >= 78) {
        const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}/win`);
        if (response.status === 200) {
          const resBody = await response.json();
          ctx.replyWithPhoto(resBody.answers[0].absolute_picture_path)
          ctx.reply(`Это: ${resBody.answers[0].name}, количество альтернативных вариантов ${resBody.guessCount}`);
        }
      } else ctx.reply(`${resBody.question}`);
    }
  } else ctx.reply(`Для старта новой игры набери \/game`);
});

bot.hears('Возможно', async (ctx) => {
  const { id } = ctx.message.from;
    if (app.locals.DB.get(+id)) {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: '3',
      }),
    })
    if (response.status === 200) {
      const resBody = await response.json();
      if (+resBody.progress >= 70 || +resBody.currentStep >= 78) {
        const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}/win`);
        if (response.status === 200) {
          const resBody = await response.json();
          ctx.replyWithPhoto(resBody.answers[0].absolute_picture_path)
          ctx.reply(`Это: ${resBody.answers[0].name}, количество альтернативных вариантов ${resBody.guessCount}`);
        }
      } else ctx.reply(`${resBody.question}`);
    }
  } else ctx.reply(`Для старта новой игры набери \/game`);
});

bot.hears('Скорее нет', async (ctx) => {
  const { id } = ctx.message.from;
  if (app.locals.DB.get(+id)) {
    const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer: '4',
      }),
    })
    if (response.status === 200) {
      const resBody = await response.json();
      if (+resBody.progress >= 70 || +resBody.currentStep >= 78) {
        const response = await fetch(`${process.env.serverURL}:${process.env.PORT}/api/v1/games/${id}/win`);
        if (response.status === 200) {
          const resBody = await response.json();
          ctx.replyWithPhoto(resBody.answers[0].absolute_picture_path)
          ctx.reply(`Это: ${resBody.answers[0].name}, количество альтернативных вариантов ${resBody.guessCount-1}`);
        }
      } else ctx.reply(`${resBody.question}`);
    }
  } else ctx.reply(`Для старта новой игры набери \/game`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/games', gamesRouterAPI);

app.listen(process.env.PORT, () => {
  console.log('Server started on port ', process.env.PORT);
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
