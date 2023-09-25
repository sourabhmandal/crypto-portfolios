"use client";
import { createContext, useState } from "react";

export interface User {
  username: string;
  walletAddress: string;
  setUserName: (username: string) => void;
  setWalletAddress: (walletAddress: string) => void;
}
export const UserContext = createContext<User>({
  username: "",
  walletAddress: "",
  setUserName: () => {},
  setWalletAddress: () => {},
});

export function UserContextProvider({ children }: any) {
  const setUsername = (username: string) => {
    setUser((prev) => {
      prev.username = username;
      return prev;
    });
  };

  const setWalletAddress = (walletAddress: string) => {
    setUser((prev) => {
      prev.walletAddress = walletAddress;
      return prev;
    });
  };

  const initState: User = {
    username: "",
    walletAddress: "",
    setUserName: setUsername,
    setWalletAddress: setWalletAddress,
  };

  const [user, setUser] = useState(initState);
  return (
    <UserContext.Provider value={initState}>{children}</UserContext.Provider>
  );
}
