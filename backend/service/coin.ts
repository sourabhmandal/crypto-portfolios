import { Coin } from "../models/coin";
import { Coin as CoinType } from "../models/types";

export const getAllCoinsSvc = async () => {
  try {
    const data: CoinType[] = (await Coin.find({})) as CoinType[];
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};

export const upsertCoinSvc = async (symbol: string, price: number) => {
  if (symbol == "") {
    throw new Error("symbol not found");
  }

  const newCoin: CoinType = {
    price: price ?? 0,
    symbol: symbol,
  };

  try {
    const data = await Coin.findOneAndUpdate({ symbol: symbol }, newCoin, {
      new: true,
      upsert: true, // Make this update into an upsert
    });

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};
