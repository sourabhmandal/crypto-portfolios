import { Balance } from "../models/balance";
import { Coin } from "../models/coin";
import {
  Balance as BalanceType,
  Coin as CoinType,
  User as UserType,
} from "../models/types";
import { User } from "../models/user";

export const upsertBalanceSvc = async (
  walletAddress: string,
  symbol: string,
  balance: number
) => {
  if (walletAddress != "") {
    throw new Error("wallet address not provided");
  } else if (symbol != "") {
    throw new Error("symbol not provided");
  }
  const newBalance: BalanceType = {
    walletAddress: walletAddress,
    balance: balance ?? 0,
    symbol: symbol,
  };

  try {
    // check if symbol present
    const coinData: CoinType = (await Coin.findOne({
      symbol: newBalance.symbol,
    })) as CoinType;
    if (!coinData) {
      throw new Error("coin not listed yet");
    }

    // check if walletAddress present
    const userData: UserType = (await User.findOne({
      walletAddress: newBalance.walletAddress,
    })) as UserType;
    if (!userData) {
      throw new Error(
        `user with wallet-address(${newBalance.walletAddress}) not present yet`
      );
    }

    const data = await Balance.findOneAndUpdate(
      { walletAddress: walletAddress },
      newBalance,
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    );

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};

export const getAllWalletBalancesSvc = async (
  walletAddress: string,
  symbol?: string
) => {
  if (walletAddress == "") {
    throw new Error("no wallet address provided");
  }
  const param: any = {
    walletAddress: walletAddress,
    symbol: symbol ?? "",
  };
  Object.keys(param).forEach((key) => {
    if (param[key] == "") delete param[key];
  });

  try {
    const balanceData: BalanceType[] = await Balance.aggregate([
      { $match: param },
      {
        $lookup: {
          from: "coins",
          localField: "symbol",
          foreignField: "symbol",
          as: "coinDataList",
        },
      },
      {
        $addFields: { singleCoin: { $arrayElemAt: ["$coinDataList", 0] } },
      },
      {
        $project: {
          _id: 1, // Include the original _id field if needed
          symbol: 1, // Include the symbol field
          balance: 1, // Include the balance field
          price: "$singleCoin.price", // Include the price from the singleCoin field
          walletAddress: 1, // Include the walletAddress field
          value: { $multiply: ["$balance", "$singleCoin.price"] },
        },
      },
    ]);
    return balanceData;
  } catch (err) {
    console.error(err);
    throw new Error("database error occured");
  }
};
