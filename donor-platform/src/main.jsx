import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import apolloClient from './graphql/client';

// Log any unhandled promise rejections (helpful for debugging Apollo issues)
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);