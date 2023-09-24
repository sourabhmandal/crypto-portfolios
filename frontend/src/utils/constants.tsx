import { gql } from "graphql-request";
//create our query
const getAllCurrencyQuery = gql`
  query {
    getAllCurrency { #run the getAllPeople command
      id
      symbol
    }
  }
`;
//Next, declare a mutation
const addPersonMutation = gql`
  mutation addPeople($name: String!) {
    addPerson(name: $name) { #add a new entry. Argument will be 'name'
      id
      name
    }
  }
`;
export { addPersonMutation, getAllCurrencyQuery };
