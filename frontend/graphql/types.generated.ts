export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Balance = {
  __typename?: 'Balance';
  balance?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};

export type Coin = {
  __typename?: 'Coin';
  id: Scalars['ID']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertBalance?: Maybe<Balance>;
  upsertCoin?: Maybe<Coin>;
  upsertUser?: Maybe<User>;
};


export type MutationUpsertBalanceArgs = {
  balance?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpsertCoinArgs = {
  price?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpsertUserArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
  walletAddress: Scalars['String']['input'];
};

export type Networth = {
  __typename?: 'Networth';
  asset?: Maybe<Scalars['Float']['output']>;
  debt?: Maybe<Scalars['Float']['output']>;
  networth?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** will return multiple Person instances */
  getAllCoins?: Maybe<Array<Maybe<Coin>>>;
  getAllWalletBalances?: Maybe<Array<Maybe<Balance>>>;
  getUserByUserName?: Maybe<User>;
  getUserNetworth?: Maybe<Networth>;
};


export type QueryGetAllWalletBalancesArgs = {
  symbol?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserByUserNameArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserNetworthArgs = {
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username?: Maybe<Scalars['String']['output']>;
  walletAddress?: Maybe<Scalars['String']['output']>;
};
