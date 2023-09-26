"use client";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Link href="/" className="underline text-center">
        Start From Home page
      </Link>
    </div>
  );
};
export default Home;
