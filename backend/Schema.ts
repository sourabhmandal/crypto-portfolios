import { gql } from "apollo-server-express"; //will create a schema
export const Schema = gql`
  type Currency {
    id: ID!
    symbol: String
    price: Float
    value: Float
  }

  type User {
    id: ID!
    walletAddress: String
  }

  type Balance {
    balance: Float
  }

  # handle user commands
  type Query {
    "will return multiple Person instances"
    getAllCurrency: [Currency]
    getCurrencyBySymbol(symbol: Int): Currency
  }

  type Mutation {
    #the addPerson commmand will accept an argument of type String.
    #it will return a 'Person' instance. 
    addCurrency(symbol: String): Currency
  }
`;