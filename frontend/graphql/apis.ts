import { gql } from "@apollo/client";
//create our query
const getAllCoinsQuery = gql`
  query {
    getAllCoins {
      #run the getAllPeople command
      id
      symbol
    }
  }
`;
//Next, declare a mutation
const addCoinMutation = gql`
  mutation AddCoinMute($symbol: String, $price: Float) {
    #the argument will be of type Integer
    addCoin(symbol: $symbol, price: $price) {
      #get the person with the ID of 1
      symbol
      price
      id
    }
  }
`;
export { addCoinMutation, getAllCoinsQuery };
