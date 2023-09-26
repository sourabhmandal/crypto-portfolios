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
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { UpsertCoinMutDocument } from "@/graphql/apis.generated";
import { useMutation } from "@apollo/client";

import { PlusIcon, StopCircleIcon } from "@heroicons/react/24/solid";

interface DialogDemoProps extends React.HTMLAttributes<HTMLDivElement> {
  //playlists: any;
}

interface AddCoinFormData {
  symbol: string;
  price: number;
}

export function AddCoinDialog({}: DialogDemoProps) {
  const [mutate, { loading, error }] = useMutation(UpsertCoinMutDocument);
  const { toast } = useToast();

  const form = useForm<AddCoinFormData>();

  const handleAddCoinSubmit: SubmitHandler<AddCoinFormData> = async (data) =>
    await mutate({
      variables: { _price: data.price.toString(), _symbol: data.symbol },
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
          <PlusIcon className="h-4 w-4 mr-3" /> Add New Coin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Coin</DialogTitle>
          <DialogDescription>
            Add a new coin to track balances for it
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddCoinSubmit)}
            className="space-y-8"
          >
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="5000" {...field} type="number" />
                  </FormControl>
                  <FormDescription>price of each coin</FormDescription>
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
                Save Coin
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
