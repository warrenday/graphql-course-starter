import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchJobsQueryVariables = Types.Exact<{
  input: Types.SearchJobsInput;
}>;


export type SearchJobsQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title: string, location: string, type: Types.JobType, remote: boolean, salary: number, createdAt: Date, company: { __typename?: 'Company', id: string, name: string } }> };


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