import { Balance as BalanceType } from "./models/types";
import { getAllWalletBalancesSvc, upsertBalanceSvc } from "./service/balance";
import { getAllCoinsSvc, upsertCoinSvc } from "./service/coin";
import {
  getAllUsersSvc,
  getUserByUserNameSvc,
  upsertUserSvc,
} from "./service/user";
const Resolvers = {
  Query: {
    getAllCoins: async () => await getAllCoinsSvc(), //if the user runs the getAllPeople command
    getAllWalletBalances: async (_: any, args: any) => {
      return await getAllWalletBalancesSvc(args.walletAddress, args.symbol);
    },
    getUserNetworth: async (_: any, args: any) => {
      const resp: BalanceType[] = await getAllWalletBalancesSvc(
        args.walletAddress
      );

      let responseData: {
        asset: number;
        debt: number;
        networth: number;
      } = {
        asset: 0,
        debt: 0,
        networth: 0,
      };

      resp.forEach((data) => {
        const value = data.value ?? 0;
        if (value > 0) {
          responseData.asset += value;
        }

        if (value < 0) {
          responseData.debt += value;
        }
        responseData.networth += value;

        return responseData;
      });

      return responseData;
    },

    getUserByUserName: async (_: any, args: any) =>
      await getUserByUserNameSvc(args.username),

    getAllUsers: async () => await getAllUsersSvc(),
  },
  Mutation: {
    //create our mutation:
    upsertCoin: (_: any, args: any) => {
      const price = parseFloat(args.price);
      return upsertCoinSvc(args.symbol, price ?? 0);
    },

    upsertUser: (_: any, args: any) => {
      return upsertUserSvc(args.username, args.walletAddress);
    },
    upsertBalance: (_: any, args: any) => {
      const balance = args.balance ? args.balance : "0";
      return upsertBalanceSvc(
        args.walletAddress,
        args.symbol,
        balance as number
      );
    },
  },
};
export default Resolvers;
