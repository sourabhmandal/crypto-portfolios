"use client";
import { AddUserDialog } from "@/components/addUserDialog";
import { useToast } from "@/components/ui/use-toast";
import { GetAllUsersQueryDocument } from "@/graphql/apis.generated";
import { useQuery } from "@apollo/client";
import { LinkIcon } from "@heroicons/react/24/solid";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  const { toast } = useToast();
  const respGetAllUsers = useQuery(GetAllUsersQueryDocument);
  const dataGetAllUsers = respGetAllUsers?.data?.getAllUsers;
  React.useEffect(() => {
    if (respGetAllUsers.error) {
      toast({
        title: respGetAllUsers.error.name,
        description: respGetAllUsers.error.message,
      });
    }
  }, [respGetAllUsers.error]);

  if (respGetAllUsers.loading) {
    return <>Loading</>;
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex justify-center">
        <AddUserDialog />
      </div>
      <p className="text-center text-lg text-slate-500 my-6">
        Or Use existing user
      </p>
      <div className="grid grid-cols-8 px-24">
        {dataGetAllUsers?.map((data) => {
          return (
            <Link
              className="underline flex items-center"
              key={data?.username}
              href={`/${data?.username}/dashboard`}
            >
              <LinkIcon className="h-4 w-4 mx-2" />
              <p className="text-blue-300">{data?.username}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
