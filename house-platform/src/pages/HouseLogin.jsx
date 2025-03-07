import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const HouseLogin = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Validate Ethereum address using ethers
      const address = ethers.utils.getAddress(walletAddress.trim());
      
      // Optional: Add any specific validation
      // For example, checking against a specific contract owner address
      // You might want to implement additional checks here if needed

      // Save to local storage
      localStorage.setItem('houseOwnerAddress', address);

      // Redirect to dashboard
      navigate('/house-dashboard');
    } catch (err) {
      console.error('Invalid address:', err);
      setError('Invalid Ethereum address. Please check and try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">House Owner Login</h1>
          <p className="text-gray-600">Enter your wallet address</p>
        </div>

        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="walletAddress" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wallet Address
            </label>
            <input 
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Address
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Enter the wallet address associated with the contract owner</p>
        </div>
      </div>
    </div>
  );
};

export default HouseLogin;