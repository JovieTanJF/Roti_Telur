import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useRealTransactions } from '../hooks/useRealTransactions';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button'; // Added Button import

// Helper functions for formatting
const formatDateTime = (isoString) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch (error) {
    return isoString || 'Unknown';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Wallet = () => {
  const { address, formatAddress } = useWallet(); // formatAddress from context
  const { transactions, loading, error } = useRealTransactions(address);
  const [expandedTx, setExpandedTx] = useState(null);

  const toggleExpand = (id) => {
    if (expandedTx === id) {
      setExpandedTx(null);
    } else {
      setExpandedTx(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>View and track all your donations and withdrawals</CardDescription>
        </CardHeader>
        
        <CardContent>
          {loading ? (
            <div className="py-6 text-center text-gray-500">
              <svg className="animate-spin h-6 w-6 mx-auto text-purple-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm">Loading transaction history...</p>
            </div>
          ) : error ? (
            <div className="py-6 text-center text-red-500">
              <p className="text-sm">{error}</p>
            </div>
          ) : transactions && transactions.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              <p className="text-sm">No transactions found. Start donating to see your transaction history.</p>
              <Link to="/recipients" className="mt-4 inline-block">
                <Button size="sm">Make Your First Donation</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Transaction ID</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Recipient</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date & Time</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions && transactions.map((tx) => (
                    <React.Fragment key={tx.id}>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-2 text-xs">
                          <span className="font-mono text-xs">{formatAddress(tx.id)}</span>
                        </td>
                        <td className="px-3 py-2 text-xs font-medium">{tx.amount}</td>
                        <td className="px-3 py-2 text-xs">{tx.recipientName || 'Donation Contract'}</td>
                        <td className="px-3 py-2 text-xs">{formatDateTime(tx.timestamp)}</td>
                        <td className="px-3 py-2 text-xs">
                          <span className={`inline-block px-1.5 py-0.5 text-xs rounded-full ${getStatusColor(tx.status)}`}>
                            {tx.status || 'Completed'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleExpand(tx.id)}
                              className="text-purple-500 hover:text-purple-600 text-xs"
                            >
                              {expandedTx === tx.id ? 'Hide Details' : 'View Details'}
                            </button>
                            <Link
                              to={`/transaction/${tx.id}`}
                              className="text-purple-500 hover:text-purple-600 text-xs ml-2"
                            >
                              Full View
                            </Link>
                          </div>
                        </td>
                      </tr>
                      {expandedTx === tx.id && (
                        <tr className="bg-purple-500/5">
                          <td colSpan="6" className="px-3 py-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2">
                              <div>
                                <p className="text-xs text-gray-500">Blockchain Status</p>
                                <p className="text-xs">{tx.confirmations || 'Confirmed'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Recipient Address</p>
                                <p className="text-xs font-mono">{formatAddress(tx.recipient || tx.transactionHash)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Gas Fees</p>
                                <p className="text-xs">{tx.gasUsed || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Estimated Processing Time</p>
                                <p className="text-xs">{tx.estimatedTime || 'Completed'}</p>
                              </div>
                              <div className="md:col-span-2">
                                <a 
                                  href={`https://sepolia.etherscan.io/tx/${tx.transactionHash || tx.id}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-xs text-purple-500 hover:underline"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                  </svg>
                                  View on Etherscan (Sepolia)
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;