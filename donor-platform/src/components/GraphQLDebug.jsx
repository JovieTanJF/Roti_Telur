import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// Simple query to test the connection
const TEST_QUERY = gql`
  query TestQuery {
    _meta {
      block {
        number
      }
      deployment
      hasIndexingErrors
    }
  }
`;

// Specific query to test your transactions
const TEST_TRANSACTIONS = gql`
  query TestTransactions {
    transactions(first: 5) {
      id
      blockNumber
      timestamp
      from
      to
      value
    }
  }
`;

const GraphQLDebug = () => {
  const [queryType, setQueryType] = useState('meta');
  
  // Run the selected test query
  const { data, loading, error } = useQuery(
    queryType === 'meta' ? TEST_QUERY : TEST_TRANSACTIONS,
    { fetchPolicy: 'network-only' }
  );
  
  // Function to format JSON data for display
  const formatJson = (data) => {
    return JSON.stringify(data, null, 2);
  };
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold mb-4">GraphQL Connection Debug</h2>
      
      <div className="mb-4">
        <div className="flex space-x-4 mb-2">
          <button
            className={`px-3 py-1 text-sm rounded ${queryType === 'meta' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setQueryType('meta')}
          >
            Test _meta
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${queryType === 'transactions' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setQueryType('transactions')}
          >
            Test Transactions
          </button>
        </div>
        <p className="text-xs text-gray-500">
          {queryType === 'meta' 
            ? 'Testing subgraph metadata connection' 
            : 'Testing transaction data connection'}
        </p>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-40 bg-gray-50 rounded">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-700 font-medium mb-2">Error:</h3>
          <pre className="text-xs overflow-auto max-h-40 bg-red-100 p-2 rounded">
            {error.message}
          </pre>
          {error.graphQLErrors && (
            <div className="mt-2">
              <h4 className="text-red-700 text-sm font-medium">GraphQL Errors:</h4>
              <pre className="text-xs overflow-auto max-h-40 bg-red-100 p-2 rounded">
                {formatJson(error.graphQLErrors)}
              </pre>
            </div>
          )}
          {error.networkError && (
            <div className="mt-2">
              <h4 className="text-red-700 text-sm font-medium">Network Error:</h4>
              <pre className="text-xs overflow-auto max-h-40 bg-red-100 p-2 rounded">
                {error.networkError.message}
              </pre>
            </div>
          )}
        </div>
      ) : data ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-green-700 font-medium mb-2">Success:</h3>
          <pre className="text-xs overflow-auto max-h-60 bg-green-100 p-2 rounded">
            {formatJson(data)}
          </pre>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-50 rounded">
          <p className="text-gray-500">No data received</p>
        </div>
      )}
      
      <div className="mt-4 border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium mb-2">Troubleshooting Tips:</h3>
        <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
          <li>Make sure your subgraph is properly deployed and synced</li>
          <li>Check that the endpoint URL in config/api.js is correct</li>
          <li>Verify that your subgraph schema matches the queries</li>
          <li>Check browser console for more detailed error messages</li>
          <li>Try switching from URL with studio ID to URL with deployment ID</li>
        </ul>
      </div>
    </div>
  );
};

export default GraphQLDebug;