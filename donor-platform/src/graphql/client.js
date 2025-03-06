import { QueryClient } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create a QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data is fresh for 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// GraphQL endpoint
export const GRAPHQL_ENDPOINT = 'https://api.studio.thegraph.com/query/105870/test-subgraph/version/latest';

// Define your queries
export const DONORS_QUERY = gql`
  query GetDonors($first: Int) {
    donors(first: $first) {
      id
      address
      totalDonated
      donationCount
    }
  }
`;

export const DONATIONS_QUERY = gql`
  query GetDonations($first: Int, $donor: String) {
    donations(first: $first, where: { donor: $donor }) {
      id
      donor {
        id
        address
      }
      recipient {
        id
        address
        name
      }
      amount
      timestamp
    }
  }
`;

export const DONATION_BY_ID_QUERY = gql`
  query GetDonationById($id: ID!) {
    donation(id: $id) {
      id
      donor {
        id
        address
      }
      recipient {
        id
        address
        name
      }
      amount
      timestamp
    }
  }
`;

// Create Apollo Client for use with ApolloProvider
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

// Add default export for App.jsx
export default client;