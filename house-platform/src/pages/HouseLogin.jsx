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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-lavender-500 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">House Owner Portal</h1>
          <p className="text-gray-600">Enter your wallet address to access the dashboard</p>
        </div>

        <form onSubmit={handleAddressSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="walletAddress" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wallet Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text"
                id="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-lavender-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-lavender-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-md transition-all font-medium"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default HouseLogin;