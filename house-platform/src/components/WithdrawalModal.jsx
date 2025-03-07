import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useContract } from '../context/ContractContext';

const WithdrawalModal = ({ isOpen, onClose, balance, onSuccess }) => {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [error, setError] = useState('');
  const { getSignedContract } = useContract();

  if (!isOpen) return null;

  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    setError('');
    
    try {
      const signedContract = await getSignedContract();
      if (!signedContract) {
        throw new Error('Failed to connect to contract');
      }
      
      const tx = await signedContract.withdrawFunds();
      await tx.wait();
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Withdrawal error:', err);
      setError(err.message || 'Failed to withdraw funds');
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Withdraw Funds</h3>
          
          <p className="text-gray-600 mb-4">
            You are about to withdraw <span className="font-medium">{balance} ETH</span> from the contract to your wallet.
          </p>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isWithdrawing}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={handleWithdraw}
              disabled={isWithdrawing || parseFloat(balance) <= 0}
              className={`px-4 py-2 rounded-md ${
                isWithdrawing || parseFloat(balance) <= 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isWithdrawing ? 'Processing...' : 'Confirm Withdrawal'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;