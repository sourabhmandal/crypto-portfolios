import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetAllCoinSymbolsQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCoinSymbolsQueryQuery = { __typename?: 'Query', getAllCoins?: Array<{ __typename?: 'Coin', id: string, symbol?: string | null } | null> | null };

export type GetAllCoinsCompleteDataQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllCoinsCompleteDataQueryQuery = { __typename?: 'Query', getAllCoins?: Array<{ __typename?: 'Coin', id: string, symbol?: string | null, price?: number | null } | null> | null };

export type UpsertCoinMutMutationVariables = Types.Exact<{
  _symbol?: Types.InputMaybe<Types.Scalars['String']['input']>;
  _price?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpsertCoinMutMutation = { __typename?: 'Mutation', upsertCoin?: { __typename?: 'Coin', symbol?: string | null, price?: number | null, id: string } | null };

export type UpsertUserMutMutationVariables = Types.Exact<{
  _username?: Types.InputMaybe<Types.Scalars['String']['input']>;
  _walletAddress: Types.Scalars['String']['input'];
}>;


export type UpsertUserMutMutation = { __typename?: 'Mutation', upsertUser?: { __typename?: 'User', username?: string | null, walletAddress?: string | null } | null };

export type GetUserDetailQueryQueryVariables = Types.Exact<{
  _username?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetUserDetailQueryQuery = { __typename?: 'Query', getUserByUserName?: { __typename?: 'User', username?: string | null, walletAddress?: string | null } | null };

export type GetAllUsersQueryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllUsersQueryQuery = { __typename?: 'Query', getAllUsers?: Array<{ __typename?: 'User', walletAddress?: string | null, username?: string | null } | null> | null };

export type UpsertBalanceMutMutationVariables = Types.Exact<{
  _walletAddress?: Types.InputMaybe<Types.Scalars['String']['input']>;
  _symbol?: Types.InputMaybe<Types.Scalars['String']['input']>;
  _balance?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpsertBalanceMutMutation = { __typename?: 'Mutation', upsertBalance?: { __typename?: 'Balance', walletAddress?: string | null, balance?: number | null } | null };

export type GetAllWalletBalanceQueryQueryVariables = Types.Exact<{
  _walletAddress?: Types.InputMaybe<Types.Scalars['String']['input']>;
  _symbol?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetAllWalletBalanceQueryQuery = { __typename?: 'Query', getAllWalletBalances?: Array<{ __typename?: 'Balance', walletAddress?: string | null, balance?: number | null, symbol?: string | null, value?: string | null } | null> | null };

export type GetUserNetWorthQueryQueryVariables = Types.Exact<{
  _walletAddress?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetUserNetWorthQueryQuery = { __typename?: 'Query', getUserNetworth?: { __typename?: 'Networth', networth?: number | null, asset?: number | null, debt?: number | null } | null };


export const GetAllCoinSymbolsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCoinSymbolsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCoins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<GetAllCoinSymbolsQueryQuery, GetAllCoinSymbolsQueryQueryVariables>;
export const GetAllCoinsCompleteDataQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCoinsCompleteDataQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCoins"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetAllCoinsCompleteDataQueryQuery, GetAllCoinsCompleteDataQueryQueryVariables>;
export const UpsertCoinMutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCoinMut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_symbol"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_price"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCoin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"symbol"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_symbol"}}},{"kind":"Argument","name":{"kind":"Name","value":"price"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_price"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpsertCoinMutMutation, UpsertCoinMutMutationVariables>;
export const UpsertUserMutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertUserMut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_username"}}},{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}}]}}]}}]} as unknown as DocumentNode<UpsertUserMutMutation, UpsertUserMutMutationVariables>;
export const GetUserDetailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserDetailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByUserName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}}]}}]}}]} as unknown as DocumentNode<GetUserDetailQueryQuery, GetUserDetailQueryQueryVariables>;
export const GetAllUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQueryQuery, GetAllUsersQueryQueryVariables>;
export const UpsertBalanceMutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertBalanceMut"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_symbol"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_balance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"symbol"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_symbol"}}},{"kind":"Argument","name":{"kind":"Name","value":"balance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_balance"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<UpsertBalanceMutMutation, UpsertBalanceMutMutationVariables>;
export const GetAllWalletBalanceQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllWalletBalanceQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_symbol"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllWalletBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"symbol"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_symbol"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"walletAddress"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetAllWalletBalanceQueryQuery, GetAllWalletBalanceQueryQueryVariables>;
export const GetUserNetWorthQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserNetWorthQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserNetworth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networth"}},{"kind":"Field","name":{"kind":"Name","value":"asset"}},{"kind":"Field","name":{"kind":"Name","value":"debt"}}]}}]}}]} as unknown as DocumentNode<GetUserNetWorthQueryQuery, GetUserNetWorthQueryQueryVariables>;