import { Telegraf, Scenes, Markup } from "telegraf";
import LocalSession from "telegraf-session-local";
import mongoose from "mongoose";
import { getAllUsersIds, saveUserToDB } from "./mongo/utils/db_utils";
import {
  generateMessageOfAdvt,
  requestAddUser,
  sendMessageToAdmin,
} from "./utils";
import express from "express";
import { Advt } from "./types";

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключение к БД
mongoose.connect(process.env.MONGO_URL as string);

// Инициализируем бота
const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN as string);
const localSession = new LocalSession({
  database: process.env.SESSION_DB as string,
});

bot.use((ctx, next) => {
  getAllUsersIds().then((ids) => {
    try {
      const hasUser = ids.some((id) => id == ctx.from!.id);

      if (hasUser) {
        next();
      } else {
        ctx.reply(`У Вас нету доступа :(`, Markup.removeKeyboard());
        requestAddUser(bot, ctx.from!);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

bot.use(localSession.middleware());

// Создаем сцены
const stage = new Scenes.Stage<Scenes.SceneContext>([]);

// Подключаем сцены к боту
bot.use(stage.middleware());

app.post("/notify", (req, res) => {
  const advt: Advt = req.body.advt;

  const messagePromise = generateMessageOfAdvt(advt);
  const usersIdsPromise = getAllUsersIds();

  Promise.all([messagePromise, usersIdsPromise]).then(([message, usersIds]) => {
    usersIds.map((userId) => {
      bot.telegram.sendPhoto(userId, advt.images[0], {
        parse_mode: "Markdown",
        caption: message,
        reply_markup: Markup.inlineKeyboard([
          [
            Markup.button.url(`Подробнее`, `https://${advt.site}${advt.url}`),
            Markup.button.url(
              `Открыть на ${advt.site}`,
              `https://${advt.site}${advt.url}`
            ),
          ],
        ]).reply_markup,
      });
    });
  });

  res.sendStatus(200);
});

bot.action(/addUser \|(.+)\| \|(.+)\| \|(.+)\|/, async (ctx) => {
  try {
    const id = ctx.match[1];
    const username = ctx.match[2];
    const fio = ctx.match[3];

    const ids = await getAllUsersIds();

    if (ids.some((idInArray) => idInArray.toString() == id)) {
      ctx.reply(`Доступ уже предоставлен раньше!!!`);
    } else {
      saveUserToDB({
        id: parseInt(id),
        is_bot: false,
        first_name: fio,
        username,
      }).then((result) => ctx.reply(result));

      sendMessageToAdmin(
        bot,
        `Доступ предоставлен: ${ctx.match[3]}, ${
          ctx.match[2] == "-" ? "-" : "@" + ctx.match[2]
        }, ${ctx.match[1]}`
      );

      bot.telegram.sendMessage(id, "Доступ предоставлен.\nОжидайте данные!");
    }

    ctx.deleteMessage();
  } catch (err) {
    console.log(err);
  }
});

// bot.hears("add", (ctx) => {
//   saveUserToDB(ctx.message.from).then((result) => ctx.reply(result));
// });

// Проверка пользователем на работоспособность
bot.on("text", (ctx) => {
  ctx.reply(`Работает`);
});

bot.launch();

app.listen(port, () =>
  console.log(`Bot autohunt_bot is listening on ${port}: ${new Date()}`)
);
