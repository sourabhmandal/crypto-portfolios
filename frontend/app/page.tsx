import { Button } from "@/components/ui/button";
import { getAllCoinsQuery } from "@/graphql/apis";
import { getClient } from "@/graphql/client";
import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = async () => {
  const { data, loading, error } = await getClient().query({
    query: getAllCoinsQuery,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const result = data.getAllCoins;

  return error ? (
    <>error occured : {error}</>
  ) : loading ? (
    <></>
  ) : (
    <div>
      <Button>Sourabh</Button>
      {result.map((item: any) => {
        //render the 'result' array to the UI
        return (
          <p className="text-3xl font-bold underline" key={item.id}>
            {item.symbol}
          </p>
        );
      })}
      <Link href="/addpage">Add a new entry </Link>
    </div>
  );
};

export default Home;
