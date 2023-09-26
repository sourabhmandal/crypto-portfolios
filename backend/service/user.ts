import { User as UserType } from "../models/types";
import { User } from "../models/user";

export const upsertUserSvc = async (
  username: string,
  walletAddress: string
) => {
  if (!username) {
    throw new Error("username not provided");
  } else if (!walletAddress) {
    throw new Error("wallet address not provided");
  }

  const newUser: UserType = {
    username: username,
    walletAddress: walletAddress,
  };

  try {
    const data = await User.findOneAndUpdate({ username: username }, newUser, {
      new: true,
      upsert: true, // Make this update into an upsert
    });
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};

export const getUserByUserNameSvc = async (username: string) => {
  if (!username) {
    throw new Error("username not provided");
  }
  try {
    const data: UserType = (await User.findOne({
      username: username,
    })) as UserType;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};


export const getAllUsersSvc = async () => {
  try {
    const data: UserType[] = (await User.find()) as UserType[];
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};