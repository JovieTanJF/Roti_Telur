import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRealTransaction } from '../hooks/useRealTransactions';
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import { formatDateTime } from '../utils/formatters';

// Helper function for status color
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

const TransactionDetail = () => {
  const { id } = useParams();
  const { transaction, loading, error } = useRealTransaction(id);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (transaction) {
      if (transaction.status === 'Completed') {
        setProgressPercentage(100);
      } else if (transaction.status === 'Failed') {
        setProgressPercentage(100);
      } else {
        // For pending transactions, calculate percentage based on confirmations
        const confirmations = transaction.confirmations || 0;
        const percentage = Math.min(
          Math.ceil((confirmations / 12) * 100),
          90
        );
        setProgressPercentage(percentage);
      }
    }
  }, [transaction]);

  const formatTransactionHash = (hash) => {
    if (!hash) return '';
    
    // Remove any suffix after a dash (like -16)
    let cleanHash = hash.split('-')[0];
    
    // Ensure it starts with 0x
    cleanHash = cleanHash.startsWith('0x') ? cleanHash : `0x${cleanHash}`;
    
    // Ensure even number of digits (excluding 0x)
    if ((cleanHash.length - 2) % 2 !== 0) {
      cleanHash = `0x0${cleanHash.substring(2)}`;
    }
    
    return cleanHash.toLowerCase();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link to="/wallet" className="text-purple-500 hover:underline mr-4">
          ← Back to Transactions
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Transaction Details</h1>
      </div>
      
      {loading ? (
        <div className="py-8 text-center text-gray-500">
          <svg className="animate-spin h-8 w-8 mx-auto text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Loading transaction details...</p>
        </div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">
          <p>{error}</p>
          <Link to="/wallet" className="mt-4 inline-block">
            <Button variant="secondary">Return to Transactions</Button>
          </Link>
        </div>
      ) : transaction ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Transaction Hash</h3>
                    <p className="font-mono text-sm break-all">{transaction.id || transaction.transactionHash}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status || 'Completed')}`}>
                        {transaction.status || 'Completed'}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h3>
                      <p className="text-sm">{formatDateTime(transaction.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">From</h3>
                      <p className="font-mono text-sm break-all">{transaction.donor}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">To</h3>
                      <p className="font-mono text-sm break-all">{transaction.recipient || '0xe455621A437ea29cb6a645ed9E4C73E94C233a99'}</p>
                      <p className="text-xs text-gray-500 mt-1">{transaction.recipientName || 'Donation Contract'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Amount</h3>
                      <p className="text-sm font-medium">{transaction.amount}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Gas Used</h3>
                      <p className="text-sm">{transaction.gasUsed || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {transaction.blockNumber && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Block Number</h3>
                      <p className="text-sm">{transaction.blockNumber}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${transaction.status === 'Failed' ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Initiated</span>
                    <span>Confirmed</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Transaction Initiated</p>
                      <p className="text-xs text-gray-500">{formatDateTime(transaction.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${transaction.blockNumber ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {transaction.blockNumber ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Transaction Mined</p>
                      <p className="text-xs text-gray-500">
                        {transaction.blockNumber 
                          ? `Block #${transaction.blockNumber}` 
                          : 'Waiting for confirmation...'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${transaction.status === 'Completed' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {transaction.status === 'Completed' ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Transaction Confirmed</p>
                      <p className="text-xs text-gray-500">
                        {transaction.status === 'Completed' 
                          ? `${transaction.confirmations || 'Multiple'} confirmations` 
                          : 'Waiting for confirmations...'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6">
            <a 
              href={`https://sepolia.etherscan.io/tx/${formatTransactionHash(transaction.id || transaction.transactionHash)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-600 text-sm flex items-center"
            >
              <span>View on Etherscan (Sepolia)</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p>Transaction not found</p>
          <Link to="/wallet" className="mt-4 inline-block">
            <Button variant="secondary">Return to Transactions</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;