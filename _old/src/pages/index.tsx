import { request } from "graphql-request"; //allows us to perform a request on our server
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { getAllCurrencyQuery } from "../utils/constants";
const Home: NextPage = ({
  result, //extract the 'result' prop 
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      {result.map((item: any) => { //render the 'result' array to the UI 
        return <p className="text-3xl font-bold underline" key={item.id}>{item.symbol}</p>;
      })}
    <Link href="/addpage">Add a new entry </Link>
    </div>
  );
};
//fetch data from the server
export const getStaticProps: GetStaticProps = async () => {
  //the first argument is the URL of our GraphQL server
  const res = await request("http://localhost:4000/graphql", getAllCurrencyQuery);
  //@ts-ignore
  const result = res.getAllCurrency;
  return {
    props: {
      result,
    }, // will be passed to the page component as props
  };
};
export default Home;