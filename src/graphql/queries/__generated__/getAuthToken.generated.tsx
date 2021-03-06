import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import * as Types from '../../types';

export type GetAuthTokenQueryVariables = Types.Exact<{
  cookie?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetAuthTokenQuery = { __typename?: 'Query' } & Pick<
  Types.Query,
  'getAuthToken'
>;

export const GetAuthTokenDocument = gql`
  query GetAuthToken($cookie: String) {
    getAuthToken(cookie: $cookie)
  }
`;

/**
 * __useGetAuthTokenQuery__
 *
 * To run a query within a React component, call `useGetAuthTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthTokenQuery({
 *   variables: {
 *      cookie: // value for 'cookie'
 *   },
 * });
 */
export function useGetAuthTokenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAuthTokenQuery,
    GetAuthTokenQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetAuthTokenQuery,
    GetAuthTokenQueryVariables
  >(GetAuthTokenDocument, baseOptions);
}
export function useGetAuthTokenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAuthTokenQuery,
    GetAuthTokenQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetAuthTokenQuery,
    GetAuthTokenQueryVariables
  >(GetAuthTokenDocument, baseOptions);
}
export type GetAuthTokenQueryHookResult = ReturnType<
  typeof useGetAuthTokenQuery
>;
export type GetAuthTokenLazyQueryHookResult = ReturnType<
  typeof useGetAuthTokenLazyQuery
>;
export type GetAuthTokenQueryResult = ApolloReactCommon.QueryResult<
  GetAuthTokenQuery,
  GetAuthTokenQueryVariables
>;
