import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

import { UpsertBalanceMutDocument } from "@/graphql/apis.generated";
import { useMutation } from "@apollo/client";

import { PlusIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

interface AddBalanceFormData {
  symbol: string;
  balance: number;
  walletAddress: string;
}

export function AddBalanceDialog() {
  const { toast } = useToast();

  const [mutate, { loading, error }] = useMutation(UpsertBalanceMutDocument);

  const form = useForm<AddBalanceFormData>();

  const handleUpsertBalanceSubmit: SubmitHandler<AddBalanceFormData> = async (
    data
  ) =>
    await mutate({
      variables: {
        _balance: data.balance.toString(),
        _symbol: data.symbol,
        _walletAddress: data.walletAddress,
      },
    });

  // handle server errors
  React.useEffect(() => {
    if (error) {
      toast({
        title: error.name,
        description: error.message,
      });
    }
  }, [error]);

  if (loading) {
    return <>Loading</>;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">
          <PlusIcon className="h-4 w-4 mr-3" /> Add New Balance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Balance for User</DialogTitle>
          <DialogDescription>
            To track your crypto portfolio. Add you crypto assets
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpsertBalanceSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0xad25b2badf88e7789ad" {...field} />
                  </FormControl>
                  <FormDescription>Enter your wallet address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="BTC"
                      {...field}
                      onChange={({ target }) => {
                        form.setValue("symbol", target.value.toUpperCase());
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the symbol of the coin
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input placeholder="5000" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    amount of this currency available
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <StopCircleIcon className="h-4 w-4 mr-3" />
                ) : (
                  <PlusIcon className="h-4 w-4 mr-3" />
                )}
                Save Balance
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
