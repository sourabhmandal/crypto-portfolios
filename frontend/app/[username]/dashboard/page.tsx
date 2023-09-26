"use client";
import { AddBalanceDialog } from "@/components/addBalanceDialog";
import { AddCoinDialog } from "@/components/addCoinDialog";
import { AddUserDialog } from "@/components/addUserDialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { BalancesTable } from "@/components/balancesTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  GetAllCoinsCompleteDataQueryDocument,
  GetAllWalletBalanceQueryDocument,
  GetAllWalletBalanceQueryQueryVariables,
  GetUserDetailQueryDocument,
  GetUserDetailQueryQueryVariables,
  GetUserNetWorthQueryDocument,
  GetUserNetWorthQueryQueryVariables,
} from "@/graphql/apis.generated";
import { useQuery } from "@apollo/client";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  params: { username: string };
}

const Dashboard: NextPage<DashboardProps> = ({ params }: DashboardProps) => {
  const form = useForm<{ search: string }>();
  const { toast } = useToast();

  const respGetAllCoins = useQuery(GetAllCoinsCompleteDataQueryDocument);
  const dataGetAllCoins = respGetAllCoins?.data?.getAllCoins;

  const respGetUserDetail = useQuery(GetUserDetailQueryDocument, {
    variables: {
      _username: params.username,
    } as GetUserDetailQueryQueryVariables,
  });
  const dataGetUserDetail = respGetUserDetail?.data?.getUserByUserName;

  const respGetAllWalletBalance = useQuery(GetAllWalletBalanceQueryDocument, {
    variables: {
      _walletAddress: dataGetUserDetail?.walletAddress,
    } as GetAllWalletBalanceQueryQueryVariables,
  });
  const dataGetAllWalletBalance =
    respGetAllWalletBalance?.data?.getAllWalletBalances;

  const respGetUserNetWorth = useQuery(GetUserNetWorthQueryDocument, {
    variables: {
      _walletAddress: dataGetUserDetail?.walletAddress,
    } as GetUserNetWorthQueryQueryVariables,
  });
  const dataGetUserNetWorth = respGetUserNetWorth?.data?.getUserNetworth;

  const [selectedSymbol, setSelectedSymbol] = React.useState<string>("");

  // handle server errors
  React.useEffect(() => {
    if (!dataGetUserDetail) {
      toast({
        title: "Client Error",
        description: "user not found",
      });
    }
    if (!dataGetAllWalletBalance) {
      toast({
        title: "Client Error",
        description: "wallet balances not found",
      });
    }

    if (!dataGetAllCoins) {
      toast({
        title: "Client Error",
        description: "coins list not found",
      });
    }
    if (!dataGetUserNetWorth) {
      toast({
        title: "Client Error",
        description: "user net-worth not found",
      });
    }
    if (respGetUserDetail.error) {
      toast({
        title: respGetUserDetail.error.name,
        description: respGetUserDetail.error.message,
      });
    }
    if (respGetAllCoins.error) {
      toast({
        title: respGetAllCoins.error.name,
        description: respGetAllCoins.error.message,
      });
    }
    if (respGetAllWalletBalance.error) {
      toast({
        title: respGetAllWalletBalance.error.name,
        description: respGetAllWalletBalance.error.message,
      });
    }
    if (respGetUserNetWorth.error) {
      toast({
        title: respGetUserNetWorth.error.name,
        description: respGetUserNetWorth.error.message,
      });
    }
  }, [
    respGetUserNetWorth.error,
    respGetAllCoins.error,
    respGetAllWalletBalance.error,
    respGetUserDetail.error,
  ]);

  if (
    respGetAllCoins.loading ||
    respGetUserDetail.loading ||
    respGetAllCoins.loading ||
    respGetAllWalletBalance.loading
  ) {
    return <>Loading</>;
  }

  if (!params.username) return <>Loading</>;

  return (
    <div>
      <div className="flex justify-between border-b items-center">
        <h1 className="text-4xl py-4">Dashboard</h1>
        <div className="space-x-4">
          <Button variant="default" className="rounded-sm">
            <Link href={`/${params.username}/portfolio`}>Portfolio</Link>
          </Button>
          <Button variant="secondary" className="rounded-sm">
            <Link href={`/${params.username}/history`}>History</Link>
          </Button>
          <Button variant="secondary" className="rounded-sm">
            <Link href={`/${params.username}/analytics`}>Analytics</Link>
          </Button>
        </div>
      </div>
      <div className="border p-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() =>
              respGetAllWalletBalance.refetch({
                _walletAddress: dataGetUserDetail?.walletAddress,
                _symbol: form.getValues("search"),
              })
            )}
            className="grid grid-cols-2 space-x-4 justify-center items-center w-full"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Search by Coin Symbol"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-24">
              Search
            </Button>
          </form>
        </Form>
        <div className="py-6 flex space-x-4 flex-wrap">
          {dataGetAllCoins?.map((data, idx) => {
            return (
              <Badge
                key={idx}
                onClick={() => {
                  const symbol = data?.symbol?.toString() ?? "";
                  respGetAllWalletBalance.refetch({
                    _walletAddress: dataGetUserDetail?.walletAddress,
                    _symbol: selectedSymbol == symbol ? "" : symbol,
                  });
                  setSelectedSymbol((prev) => (symbol == prev ? "" : symbol));
                }}
                className="py-1 cursor-pointer"
                variant={selectedSymbol == data?.symbol ? "default" : "outline"}
              >
                <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                {data?.symbol}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="space-x-4 grid grid-cols-4 grid-rows-1">
        <Card
          className={
            "w-auto rounded-lg border-green-400 bg-green-400 bg-opacity-10 border-b-4"
          }
        >
          <CardContent className="px-8 py-6">
            <p className="font-bold text-sm text-slate-500">Net worth</p>
            <p className="my-2 text-3xl text-green-400">
              {dataGetUserNetWorth?.networth ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card
          className={
            "w-auto rounded-lg border-green-400 bg-green-400 bg-opacity-10 border-b-4"
          }
        >
          <CardContent className="px-8 py-6">
            <p className="font-bold text-sm text-slate-500">Total reward</p>
            <p className="my-2 text-3xl text-green-400">0</p>
          </CardContent>
        </Card>
        <Card
          className={
            "w-auto rounded-lg border-green-400 bg-green-400 bg-opacity-10 border-b-4"
          }
        >
          <CardContent className="px-8 py-6">
            <p className="font-bold text-sm text-slate-500">Total assets</p>
            <p className="my-2 text-3xl text-green-400">
              {dataGetUserNetWorth?.asset ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card
          className={
            "w-auto rounded-lg border-green-400 bg-green-400 bg-opacity-10 border-b-4"
          }
        >
          <CardContent className="px-8 py-6">
            <p className="font-bold text-sm text-slate-500">Total debt</p>
            <p className="my-2 text-3xl text-green-400">
              {dataGetUserNetWorth?.debt ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 space-x-3 my-6">
        <AddCoinDialog />
        <AddUserDialog />
        <AddBalanceDialog />
      </div>

      <BalancesTable
        username={params.username}
        dataGetAllWalletBalance={dataGetAllWalletBalance}
        dataGetAllCoins={dataGetAllCoins}
        dataGetUserDetail={dataGetUserDetail}
      />
    </div>
  );
};
export default Dashboard;
