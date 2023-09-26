import { User as UserType } from "../models/types";
import { User } from "../models/user";

export const upsertUserSvc = async (
  username: string,
  walletAddress: string
) => {
  if (!username) {
    throw new Error("username not provided");
  }
  if (!walletAddress) {
    throw new Error("wallet address not provided");
  }

  if (
    /^0x[a-fA-F0-9]{40}$/g.test(walletAddress) == false ||
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/g.test(walletAddress) == false
  ) {
    throw new Error("invalid wallet address");
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