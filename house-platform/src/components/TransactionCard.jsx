import React from 'react';
import { shortenAddress, formatTimestamp } from '../utils/ethersUtils';

const TransactionCard = ({ transaction, index }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
          transaction.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
        }`}>
          #{index + 1}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">From: {shortenAddress(transaction.donor)}</p>
          <p className="text-xs text-gray-500">{formatTimestamp(transaction.timestamp)}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between">
          <span className="text-xs text-gray-500">Amount</span>
          <span className="text-sm font-medium">{transaction.amount} ETH</span>
        </div>
      </div>
      
      <div className="text-right">
        <a 
          href={`https://sepolia.etherscan.io/tx/${transaction.transactionHash}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline inline-flex items-center"
        >
          View on Etherscan
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default TransactionCard;