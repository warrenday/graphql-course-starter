import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProfileQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, email: string, appliedJobs: Array<{ __typename?: 'Job', id: string, title: string, location: string, type: Types.JobType, remote: boolean, salary: number, createdAt: Date, company: { __typename?: 'Company', id: string, name: string } }> } | null };

export type CancelApplicationMutationVariables = Types.Exact<{
  input: Types.CancelApplicationInput;
}>;


export type CancelApplicationMutation = { __typename?: 'Mutation', cancelApplication: boolean };


export const ProfileDocument = gql`
    query Profile {
  me {
    id
    name
    email
    appliedJobs {
      id
      title
      location
      type
      remote
      salary
      company {
        id
        name
      }
      createdAt
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export function useProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileSuspenseQueryHookResult = ReturnType<typeof useProfileSuspenseQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const CancelApplicationDocument = gql`
    mutation CancelApplication($input: CancelApplicationInput!) {
  cancelApplication(input: $input)
}
    `;
export type CancelApplicationMutationFn = Apollo.MutationFunction<CancelApplicationMutation, CancelApplicationMutationVariables>;

/**
 * __useCancelApplicationMutation__
 *
 * To run a mutation, you first call `useCancelApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelApplicationMutation, { data, loading, error }] = useCancelApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CancelApplicationMutation, CancelApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelApplicationMutation, CancelApplicationMutationVariables>(CancelApplicationDocument, options);
      }
export type CancelApplicationMutationHookResult = ReturnType<typeof useCancelApplicationMutation>;
export type CancelApplicationMutationResult = Apollo.MutationResult<CancelApplicationMutation>;
export type CancelApplicationMutationOptions = Apollo.BaseMutationOptions<CancelApplicationMutation, CancelApplicationMutationVariables>;