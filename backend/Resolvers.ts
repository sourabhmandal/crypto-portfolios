import people from "./dataset"; //get all of the available data from our database.
const Resolvers = {
  Query: {
    getAllCurrency: () => people, //if the user runs the getAllPeople command
    //if the user runs the getPerson command:
    getCurrencyBySymbol: (_: any, args: any) => {
      console.log(args);
      //get the object that contains the specified ID.
      return people.find((person) => person.id === args.symbol);
    },
  },
  Mutation: {
    //create our mutation:
    addCurrency: (_: any, args: any) => {
      const newPerson = {
        id: people.length + 1, //id field
        symbol: args.symbol,
        price: 0,
        value: 0,
      };
      people.push(newPerson);
      return newPerson; //return the new object's result
    },
  },
};
export default Resolvers;
