import mongoose from "mongoose";
import { UserSchema } from "../models/User";
import { MongoServerError } from "mongodb";
import { User as UserTelegram } from "telegraf/typings/core/types/typegram";

const User = mongoose.model("User", UserSchema);

export const saveUserToDB = async (fromUser: UserTelegram): Promise<string> => {
  try {
    const user = new User({
      name: fromUser.first_name + " " + fromUser.last_name,
      username: fromUser.username,
      user_id: fromUser.id,
    });

    await user.save();

    return "Пользователь добавлен!";
  } catch (err) {
    if ((err as MongoServerError).code == 11000) {
      return "Такой пользователь уже есть!";
    } else {
      return "Ошибка добавления!";
    }
  }
};

export const getAllUsersIds = async (): Promise<number[]> => {
  const activeUsersIds = await User.find()
    .select({ user_id: 1, _id: 0 })
    .then((result) => result.map((user) => user.user_id));

  const allUsers = [
    ...activeUsersIds,
    ...process.env
      .ADMINS_ID!.split(",")
      .map((id) => parseInt(id))
      .filter((id) => !activeUsersIds.includes(id)),
  ];

  return allUsers;
};

export const getActiveUsersIds = async (): Promise<number[]> => {
  const activeUsersIds = await User.find({ scene: "" })
    .select({ user_id: 1, _id: 0 })
    .then((result) => result.map((user) => user.user_id));

  return activeUsersIds;
};

export const setSceneUserToDB = async (
  fromUser: UserTelegram,
  sceneName: String
) => {
  try {
    User.updateOne({ user_id: fromUser.id }, { scene: sceneName }).catch(
      (err) => console.log(err)
    );
  } catch (err) {
    console.log(err);
  }
};
