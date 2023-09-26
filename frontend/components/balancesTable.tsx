"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WalletIcon } from "@heroicons/react/24/outline";

interface BalancesTableProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  dataGetAllWalletBalance:
    | ({
        __typename?: "Balance" | undefined;
        walletAddress?: string | null | undefined;
        balance?: number | null | undefined;
        symbol?: string | null | undefined;
        value?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  dataGetAllCoins:
    | ({
        __typename?: "Coin" | undefined;
        id: string;
        symbol?: string | null | undefined;
        price?: number | null | undefined;
      } | null)[]
    | null
    | undefined;
  dataGetUserDetail:
    | {
        __typename?: "User" | undefined;
        username?: string | null | undefined;
        walletAddress?: string | null | undefined;
      }
    | null
    | undefined;
}

export function BalancesTable({
  dataGetAllWalletBalance,
  dataGetAllCoins,
  dataGetUserDetail,
}: BalancesTableProps) {
  return (
    <div>
      <div className="my-8"></div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center my-2">
          <WalletIcon className="h-6 w-6" />
          <p className="text-2xl p-2 pr-6">Wallet</p>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-slate-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hide small balances
            </label>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">ASSETS</TableHead>
            <TableHead className="w-[150px]">BALANCES</TableHead>
            <TableHead className="w-[150px]">PRICE</TableHead>
            <TableHead className="text-right w-[150px]">VALUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataGetAllWalletBalance?.map((coinBalance, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium py-2 flex items-center">
                <Avatar className="h-9 w-9 mr-4">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="uppercase text-base font-bold">
                    {coinBalance?.symbol}
                  </p>
                  <p className="text-slate-500">On Ethereum</p>
                </div>
              </TableCell>
              <TableCell>{coinBalance?.balance ?? 0}</TableCell>
              <TableCell>
                {
                  dataGetAllCoins?.find(
                    (coin) => coin?.symbol == coinBalance?.symbol
                  )?.price
                }
              </TableCell>
              <TableCell className="text-right">
                {coinBalance?.value ?? 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
