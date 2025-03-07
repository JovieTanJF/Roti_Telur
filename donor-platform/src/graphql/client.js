import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { graphApiConfig } from '../config/api';

// Create an error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error in operation ${operation.operationName}]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error in operation ${operation.operationName}]: ${networkError}`);
  }
});

// Create a middleware link for logging requests
const loggingLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL Request: ${operation.operationName}`, operation.variables);
  
  return forward(operation).map((response) => {
    if (!response.data) {
      console.warn(`No data returned for operation: ${operation.operationName}`);
    }
    return response;
  });
});

// Create the HTTP link with the correct endpoint
const httpLink = new HttpLink({
  uri: 'https://api.studio.thegraph.com/query/105870/test-subgraph/version/latest',
  // If your subgraph requires authentication, add headers here
  // headers: { authorization: `Bearer ${token}` }
});

// Combine all the links
const link = from([
  errorLink,
  loggingLink,
  httpLink
]);

// Create the Apollo Client with the combined links
const client = new ApolloClient({
  link,
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