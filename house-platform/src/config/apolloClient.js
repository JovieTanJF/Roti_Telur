import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Create an error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Create the HTTP link with the correct endpoint
const httpLink = new HttpLink({
    uri: 'https://api.studio.thegraph.com/query/105870/test-subgraph/version/latest',
    // If your subgraph requires authentication, add headers here
    // headers: { authorization: `Bearer ${token}` }
  });

// Create the Apollo Client
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  }
});

export default client;