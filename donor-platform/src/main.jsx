// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { ThirdwebProvider } from '@thirdweb-dev/react';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import App from './App';
// import './index.css';

// // Configure Apollo Client for GraphQL
// const client = new ApolloClient({
//   uri: 'https://api.thegraph.com/subgraphs/name/yourdummysubgraph/donation-platform',
//   cache: new InMemoryCache(),
// });

// // Ethereum chains
// const activeChain = "ethereum";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ThirdwebProvider activeChain={activeChain}>
//       <ApolloProvider client={client}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ApolloProvider>
//     </ThirdwebProvider>
//   </React.StrictMode>,
// );
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// // import { ThirdwebProvider } from '@thirdweb-dev/react';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import App from './App';
// import './index.css';
// import apolloClient from './graphql/client'

// GraphQL client setup (commented out for now)
/*
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/yourdummysubgraph/donation-platform',
  cache: new InMemoryCache(),
});
*/

// Ethereum chain (commented out for now)
// const activeChain = "ethereum";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ApolloProvider client={apolloClient}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>,
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { queryClient } from './graphql/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);