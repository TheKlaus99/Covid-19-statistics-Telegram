require('dotenv').config();
const Telegraf = require('telegraf');
const Covid19 = require('covid19-api');
const Markup = require('telegraf/markup');
const { keyboard } = require('telegraf/markup');
const Country_list = require('./country');

 
const bot = new Telegraf(process.env.bot_token);





bot.start((ctx) => ctx.reply(`
Привествую тебя, ${ctx.message.from.first_name}! Я бот, который показывает статистику по Covid-19.
Для того, чтобы узнать доступные страны - /help
`, Markup.keyboard([
    ['Russia', 'US'],
    ['/help']

])
    .resize()
    .extra()

))

bot.on('sticker', (ctx) => ctx.reply('Классный стикер)'))

bot.help((ctx) => ctx.reply(Country_list))


bot.on('text', async (ctx) =>{
    let data = {};

    try {
    data = await Covid19.getReportsByCountries(ctx.message.text);

    const formatData = `

Страна: ${data[0][0].country}\n
Количество заражений: ${data[0][0].cases}
Количество смертей: ${data[0][0].deaths}
Количество выздоровевших: ${data[0][0].recovered}
\n${data[0][0].flag}
`;
    ctx.reply(formatData);
    }
    catch {
        ctx.reply('Такой страны не существует! /help');
    }


});







bot.launch();
  
// eslint-disable-next-line no-console
console.log('Бот запущен');

