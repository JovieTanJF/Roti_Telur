import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTransaction } from '../hooks/useTransactions';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import { formatDateTime, formatAddress, getStatusColor } from '../utils/formatters';

const TransactionDetail = () => {
  const { id } = useParams();
  const { transaction, loading, error } = useTransaction(id);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (transaction) {
      if (transaction.status === 'Completed') {
        setProgressPercentage(100);
      } else if (transaction.status === 'Failed') {
        setProgressPercentage(100);
      } else {
        // For pending transactions, calculate percentage based on confirmations
        const percentage = Math.min(
          Math.ceil((transaction.confirmations / 12) * 100),
          90
        );
        setProgressPercentage(percentage);
      }
    }
  }, [transaction]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/wallet" className="text-purple hover:underline mr-4">
          ← Back to Transactions
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
      </div>
      
      {loading ? (
        <div className="py-8 text-center text-gray-500">
          <svg className="animate-spin h-8 w-8 mx-auto text-purple mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Transaction ID</p>
                    <p className="font-mono text-sm break-all">{transaction.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">{transaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p>{formatDateTime(transaction.timestamp)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-mono text-sm">{formatAddress(transaction.donor)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p>{transaction.recipientName}</p>
                    <p className="font-mono text-xs">{formatAddress(transaction.recipient)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gas Fee</p>
                    <p>{transaction.gasUsed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Confirmations</p>
                    <p>{transaction.confirmations}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link 
                  to={`https://etherscan.io/tx/${transaction.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Etherscan
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm text-gray-500">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        transaction.status === 'Failed' ? 'bg-red-500' : 'bg-purple'
                      }`} 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      progressPercentage >= 25 ? 'bg-purple text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      1
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Transaction Initiated</p>
                      <p className="text-sm text-gray-500">Transaction submitted to the blockchain</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      progressPercentage >= 50 ? 'bg-purple text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      2
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Pending Confirmation</p>
                      <p className="text-sm text-gray-500">Waiting for network confirmation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      progressPercentage >= 75 ? 'bg-purple text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      3
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Blockchain Verification</p>
                      <p className="text-sm text-gray-500">Verifying transaction on blockchain</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      progressPercentage >= 100 ? (transaction.status === 'Failed' ? 'bg-red-500 text-white' : 'bg-green-500 text-white') : 'bg-gray-200 text-gray-400'
                    }`}>
                      4
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{transaction.status === 'Failed' ? 'Transaction Failed' : 'Transaction Complete'}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.status === 'Failed' ? 'Transaction couldn\'t be processed' : 'Donation successfully delivered'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {transaction.status === 'Pending' && (
                  <div className="mt-6 p-3 bg-yellow-50 rounded-radius-card text-sm text-yellow-800">
                    <p className="font-medium">Estimated completion time:</p>
                    <p>{transaction.estimatedTime}</p>
                  </div>
                )}
              </CardContent>
            </Card>
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