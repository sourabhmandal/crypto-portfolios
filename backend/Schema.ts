import { gql } from "apollo-server-express"; //will create a schema
export const Schema = gql`
  type Coin {
    id: ID!
    symbol: String
    price: Float
  }

  type User {
    id: ID!
    username: String
    walletAddress: String
  }

  type Balance {
    symbol: String
    balance: Float
    walletAddress: String
    value: String # calculated
  }

  type Networth {
    networth: Float
    asset: Float
    debt: Float
  }
  # handle user commands
  type Query {
    "will return multiple Person instances"
    getAllCoins: [Coin]
    getAllWalletBalances(walletAddress: String, symbol: String): [Balance]
    getUserNetworth(walletAddress: String): Networth
    getUserByUserName(username: String): User
    getAllUsers: [User]
  }

  type Mutation {
    #the addPerson commmand will accept an argument of type String.
    #it will return a 'Person' instance.
    upsertCoin(symbol: String, price: String): Coin
    upsertUser(username: String, walletAddress: String): User
    upsertBalance(
      symbol: String
      walletAddress: String
      balance: String
    ): Balance
  }
`;
