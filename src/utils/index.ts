import { User as UserTelegram } from "telegraf/typings/core/types/typegram";
import { Markup, Scenes, Telegraf } from "telegraf";
import { Advt } from "../types";

export const requestAddUser = (
  bot: Telegraf<Scenes.SceneContext<Scenes.SceneSessionData>>,
  fromUser: UserTelegram
) => {
  try {
    process.env.ADMINS_ID!.split(",").map((admin_id) => {
      const { id, username, first_name, last_name } = fromUser;
      const text = `
        Запрос на доступ:
        
        Имя: ${first_name} ${last_name}
        Nik: ${username ? "@" + username : "-"}
        ID: ${id}
            `;
      const keyboard = Markup.inlineKeyboard([
        Markup.button.callback(
          "Добавить",
          `addUser |${id}| |${username || "-"}| |${
            first_name + " " + last_name
          }|`
        ),
      ]);

      bot.telegram
        .getChat(admin_id)
        .then((user) => bot.telegram.sendMessage(user.id, text, keyboard))
        .catch(() => console.log("ERROR ADD USER!"));
    });
  } catch {
    console.log("ERROR ADD USER!");
  }
};

export const sendMessageToAdmin = (
  bot: Telegraf<Scenes.SceneContext<Scenes.SceneSessionData>>,
  message: string
) => {
  try {
    process.env.ADMINS_ID!.split(",").map((admin_id) => {
      bot.telegram
        .getChat(admin_id)
        .then((user) => bot.telegram.sendMessage(user.id, message))
        .catch(() => console.log("ERROR ADD USER!"));
    });
  } catch {
    console.log("ERROR ADD USER!");
  }
};

export const generateMessageOfAdvt = (advt: Advt): string => {
  return `
*🚘 ${advt.brand} ${advt.model} ${advt.generation}*
  
💰 Цена: *${advt.price_byn} р.  | $${advt.price_usd}*
📅 Год: *${advt.year}*
🚩 Пробег: *${advt.kilometers} км*
💡 Коробка: *${advt.gearbox}*
📏 Объем дв.: *${advt.volume} л. (${advt.fuel})*
🧭 Город: *${advt.city}*
  `;
};
