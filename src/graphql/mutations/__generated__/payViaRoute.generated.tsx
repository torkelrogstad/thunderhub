import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import * as Types from '../../types';

export type PayViaRouteMutationVariables = Types.Exact<{
  auth: Types.AuthType;
  route: Types.Scalars['String'];
  id: Types.Scalars['String'];
}>;

export type PayViaRouteMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'payViaRoute'
>;

export const PayViaRouteDocument = gql`
  mutation PayViaRoute($auth: authType!, $route: String!, $id: String!) {
    payViaRoute(auth: $auth, route: $route, id: $id)
  }
`;
export type PayViaRouteMutationFn = ApolloReactCommon.MutationFunction<
  PayViaRouteMutation,
  PayViaRouteMutationVariables
>;

/**
 * __usePayViaRouteMutation__
 *
 * To run a mutation, you first call `usePayViaRouteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayViaRouteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payViaRouteMutation, { data, loading, error }] = usePayViaRouteMutation({
 *   variables: {
 *      auth: // value for 'auth'
 *      route: // value for 'route'
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePayViaRouteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PayViaRouteMutation,
    PayViaRouteMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    PayViaRouteMutation,
    PayViaRouteMutationVariables
  >(PayViaRouteDocument, baseOptions);
}
export type PayViaRouteMutationHookResult = ReturnType<
  typeof usePayViaRouteMutation
>;
export type PayViaRouteMutationResult = ApolloReactCommon.MutationResult<
  PayViaRouteMutation
>;
export type PayViaRouteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PayViaRouteMutation,
  PayViaRouteMutationVariables
>;
