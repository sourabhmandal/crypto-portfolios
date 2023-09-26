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
import { SubmitHandler, useForm } from "react-hook-form";

import { UpsertUserMutDocument } from "@/graphql/apis.generated";
import { useMutation } from "@apollo/client";

import { useToast } from "@/components/ui/use-toast";
import { PlusIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

interface AddUserFormData {
  walletAddress: string;
  username: string;
}

export function AddUserDialog() {
  const [mutate, { loading, error }] = useMutation(UpsertUserMutDocument);
  const { toast } = useToast();

  const form = useForm<AddUserFormData>();

  const handleUpsertUserSubmit: SubmitHandler<AddUserFormData> = async (data) =>
    await mutate({
      variables: {
        _walletAddress: data.walletAddress,
        _username: data.username,
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
          <PlusIcon className="h-4 w-4 mr-3" /> Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user in the platform
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpsertUserSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john_doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the username of the person
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x986479abd87ed" {...field} />
                  </FormControl>
                  <FormDescription>
                    wallet address of the person
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
                Save User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
