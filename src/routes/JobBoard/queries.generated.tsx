import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchJobsQueryVariables = Types.Exact<{
  input: Types.SearchJobsInput;
}>;


export type SearchJobsQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title: string, location: string, type: Types.JobType, remote: boolean, salary: number, createdAt: Date, isApplied: boolean, company: { __typename?: 'Company', id: string, name: string } }> };

export type ApplyForJobMutationVariables = Types.Exact<{
  input: Types.ApplyForJobInput;
}>;


export type ApplyForJobMutation = { __typename?: 'Mutation', applyForJob: boolean };


export const SearchJobsDocument = gql`
    query SearchJobs($input: SearchJobsInput!) {
  searchJobs(input: $input) {
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
    isApplied
  }
}
    `;

/**
 * __useSearchJobsQuery__
 *
 * To run a query within a React component, call `useSearchJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchJobsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchJobsQuery(baseOptions: Apollo.QueryHookOptions<SearchJobsQuery, SearchJobsQueryVariables> & ({ variables: SearchJobsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchJobsQuery, SearchJobsQueryVariables>(SearchJobsDocument, options);
      }
export function useSearchJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchJobsQuery, SearchJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchJobsQuery, SearchJobsQueryVariables>(SearchJobsDocument, options);
        }
export function useSearchJobsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchJobsQuery, SearchJobsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchJobsQuery, SearchJobsQueryVariables>(SearchJobsDocument, options);
        }
export type SearchJobsQueryHookResult = ReturnType<typeof useSearchJobsQuery>;
export type SearchJobsLazyQueryHookResult = ReturnType<typeof useSearchJobsLazyQuery>;
export type SearchJobsSuspenseQueryHookResult = ReturnType<typeof useSearchJobsSuspenseQuery>;
export type SearchJobsQueryResult = Apollo.QueryResult<SearchJobsQuery, SearchJobsQueryVariables>;
export const ApplyForJobDocument = gql`
    mutation ApplyForJob($input: ApplyForJobInput!) {
  applyForJob(input: $input)
}
    `;
export type ApplyForJobMutationFn = Apollo.MutationFunction<ApplyForJobMutation, ApplyForJobMutationVariables>;

/**
 * __useApplyForJobMutation__
 *
 * To run a mutation, you first call `useApplyForJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyForJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyForJobMutation, { data, loading, error }] = useApplyForJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApplyForJobMutation(baseOptions?: Apollo.MutationHookOptions<ApplyForJobMutation, ApplyForJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyForJobMutation, ApplyForJobMutationVariables>(ApplyForJobDocument, options);
      }
export type ApplyForJobMutationHookResult = ReturnType<typeof useApplyForJobMutation>;
export type ApplyForJobMutationResult = Apollo.MutationResult<ApplyForJobMutation>;
export type ApplyForJobMutationOptions = Apollo.BaseMutationOptions<ApplyForJobMutation, ApplyForJobMutationVariables>;