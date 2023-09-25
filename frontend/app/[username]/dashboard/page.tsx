import { BalancesTable } from "@/components/balancesTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { DialogDemo } from "@/components/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { UserContext } from "@/context/user";
import { CurrencyDollarIcon, PlusIcon } from "@heroicons/react/24/solid";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useContext } from "react";

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  params: { username: string };
}

const Dashboard: NextPage<DashboardProps> = ({ params }: DashboardProps) => {
  console.log(params.username);
  const { username, walletAddress, setUserName, setWalletAddress } =
    useContext(UserContext);
  return (
    <div>
      <div className="py-6 flex space-x-4 flex-wrap">
        <Badge className="py-1" variant="default">
          <CurrencyDollarIcon className="h-6 w-6 mr-2" />
          <Link href="/dashboard">BTC</Link>
        </Badge>
        <Badge className="py-1" variant="outline">
          <CurrencyDollarIcon className="h-6 w-6 mr-2" />
          <Link href="/dashboard">BTC</Link>
        </Badge>
      </div>

      <div className="space-x-4 grid grid-cols-4 grid-rows-1">
        {[1, 2, 4, 5].map((idx) => (
          <Card
            key={idx}
            className={
              "w-auto rounded-lg border-green-400 bg-green-400 bg-opacity-10 border-b-4"
            }
          >
            <CardContent className="px-8 py-6">
              <p className="font-bold text-sm text-slate-500">Net worth</p>
              <p className="my-2 text-3xl text-green-400">$4,000</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 space-x-3 my-6">
        <DialogDemo />

        <Button className="bg-green-500">
          <PlusIcon className="h-4 w-4 mr-3" /> Add New User
        </Button>
        <Button className="bg-green-500">
          <PlusIcon className="h-4 w-4 mr-3" /> Add New Balance
        </Button>
      </div>

      <BalancesTable />
    </div>
  );
};
export default Dashboard;
