import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import * as Types from '../../types';

export type GetMessagesQueryVariables = Types.Exact<{
  auth: Types.AuthType;
  initialize?: Types.Maybe<Types.Scalars['Boolean']>;
  lastMessage?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetMessagesQuery = { __typename?: 'Query' } & {
  getMessages?: Types.Maybe<
    { __typename?: 'getMessagesType' } & Pick<
      Types.GetMessagesType,
      'token'
    > & {
        messages?: Types.Maybe<
          Array<
            Types.Maybe<
              { __typename?: 'messagesType' } & Pick<
                Types.MessagesType,
                | 'date'
                | 'contentType'
                | 'alias'
                | 'message'
                | 'id'
                | 'sender'
                | 'verified'
                | 'tokens'
              >
            >
          >
        >;
      }
  >;
};

export const GetMessagesDocument = gql`
  query GetMessages(
    $auth: authType!
    $initialize: Boolean
    $lastMessage: String
  ) {
    getMessages(
      auth: $auth
      initialize: $initialize
      lastMessage: $lastMessage
    ) {
      token
      messages {
        date
        contentType
        alias
        message
        id
        sender
        verified
        tokens
      }
    }
  }
`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      auth: // value for 'auth'
 *      initialize: // value for 'initialize'
 *      lastMessage: // value for 'lastMessage'
 *   },
 * });
 */
export function useGetMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GetMessagesDocument,
    baseOptions
  );
}
export function useGetMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >(GetMessagesDocument, baseOptions);
}
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<
  typeof useGetMessagesLazyQuery
>;
export type GetMessagesQueryResult = ApolloReactCommon.QueryResult<
  GetMessagesQuery,
  GetMessagesQueryVariables
>;
