export interface Coin {
  symbol: string;
  price: number;
}

export interface User {
  username: string;
  walletAddress: string;
}

export interface Balance {
  symbol: string;
  balance: number;
  walletAddress: string;
  value?: number;
}
