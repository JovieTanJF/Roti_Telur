import { useState } from 'react';
import { ethers } from 'ethers';
import Button from './Button';

const DonationModal = ({ isOpen, onClose, organization, onDonate }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!amount || parseFloat(amount) < 0.001) {
        setError('Minimum donation amount is 0.001 ETH');
        return;
      }

      // Check for MetaMask
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask to make donations');
        return;
      }

      setLoading(true);

      // For ethers v5, use Web3Provider instead of BrowserProvider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request account access
      const signer = provider.getSigner();

      // Create transaction
      const tx = await signer.sendTransaction({
        to: organization.address,
        value: ethers.utils.parseEther(amount.toString()), // Use utils instead of direct parseEther
        gasLimit: 50000
      });

      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      onDonate(receipt);
      onClose();
      setAmount('');
    } catch (err) {
      console.error('Donation error:', err);
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else if (err.code === -32603) {
        setError('Insufficient funds for transaction');
      } else {
        setError(err.message || 'Failed to process donation');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Donate to {organization.name}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount (ETH)
            </label>
            <input
              type="number"
              min="0.001"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.001"
              required
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">Minimum: 0.001 ETH</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Donation'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;