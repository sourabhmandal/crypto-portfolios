import { Button } from "@/components/ui/button";
import type { NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <div>
      <Button>Sourabh</Button>
      <Link href="/addpage">Add a new entry </Link>
    </div>
  );
};
export default Home;
