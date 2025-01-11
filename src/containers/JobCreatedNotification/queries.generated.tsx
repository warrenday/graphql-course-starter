import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JobCreatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type JobCreatedSubscription = { __typename?: 'Subscription', jobCreated: { __typename?: 'Job', id: string, title: string } };


export const JobCreatedDocument = gql`
    subscription JobCreated {
  jobCreated {
    id
    title
  }
}
    `;

/**
 * __useJobCreatedSubscription__
 *
 * To run a query within a React component, call `useJobCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJobCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useJobCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<JobCreatedSubscription, JobCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<JobCreatedSubscription, JobCreatedSubscriptionVariables>(JobCreatedDocument, options);
      }
export type JobCreatedSubscriptionHookResult = ReturnType<typeof useJobCreatedSubscription>;
export type JobCreatedSubscriptionResult = Apollo.SubscriptionResult<JobCreatedSubscription>;