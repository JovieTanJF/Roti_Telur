import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// GraphQL Query to match your subgraph schema
const GET_DONATIONS = gql`
  query GetDonations {
    donations(
      first: 100, 
      orderBy: timestamp, 
      orderDirection: desc
    ) {
      id
      donor
      amount
      timestamp
      transactionHash
    }
  }
`;

// Contract details
const contractAddress = "0xe455621A437ea29cb6a645ed9E4C73E94C233a99";
const contractABI = [
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Sepolia RPC URL from Alchemy
const SEPOLIA_RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/BLLIkMFbCJlLzxRmwzDJdHowTEJck12r';

const HouseDashboard = () => {
  const [contractBalance, setContractBalance] = useState('0');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch donations
  const { 
    loading: isDonationsLoading, 
    error: donationsError, 
    data: donationsData 
  } = useQuery(GET_DONATIONS);

  // Donation history from GraphQL
  const donationHistory = donationsData?.donations || [];

  useEffect(() => {
    // Check if user is logged in
    const savedOwnerAddress = localStorage.getItem('houseOwnerAddress');
    if (!savedOwnerAddress) {
      navigate('/');
      return;
    }

    // Fetch contract owner and balance
    const fetchContractInfo = async () => {
      try {
        // Use Alchemy RPC provider
        const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);
        
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        
        // Get contract owner
        const contractOwner = await contract.owner();
        setOwnerAddress(contractOwner);

        // Fetch contract balance
        const balance = await provider.getBalance(contractAddress);
        setContractBalance(ethers.utils.formatEther(balance));
      } catch (err) {
        console.error("Error fetching contract info:", err);
        setError(err.message || "Failed to fetch contract information");
      }
    };

    fetchContractInfo();
  }, [navigate]);

  // Withdrawal function
  const withdrawFunds = async () => {
    setIsWithdrawing(true);
    setError('');
    setWithdrawalSuccess(false);
    
    try {
      // Get saved owner address from localStorage
      const savedOwnerAddress = localStorage.getItem('houseOwnerAddress');
      
      // Ensure MetaMask is available
      if (!window.ethereum) {
        throw new Error("Ethereum provider not found. Please install MetaMask.");
      }
    
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      // Get current connected address
      const currentAddress = await signer.getAddress();
    
      // Verify if current address matches the saved owner address
      if (currentAddress.toLowerCase() !== savedOwnerAddress.toLowerCase()) {
        // Create a more detailed error message
        const errorMessage = `
          Withdrawal Failed: Incorrect Wallet
          
          Please connect with the wallet:
          ${savedOwnerAddress}
          
          Current connected wallet:
          ${currentAddress}
          
          Make sure you've selected the correct wallet in MetaMask.
        `;
    
        // Log the addresses for debugging
        console.log('Saved Address:', savedOwnerAddress);
        console.log('Current Connected Address:', currentAddress);
    
        // Throw error with detailed message
        throw new Error(errorMessage);
      }
      
      // Call withdraw function
      const tx = await contract.withdrawFunds();
      await tx.wait();
      
      // Update UI after successful withdrawal
      setWithdrawalSuccess(true);
      setContractBalance('0');
      
      // Reset success message
      setTimeout(() => {
        setWithdrawalSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error("Error withdrawing funds:", err);
      setError(err.message || "Failed to withdraw funds");
    } finally {
      setIsWithdrawing(false);
    }
  }

  // Disconnect function
  const disconnect = () => {
    localStorage.removeItem('houseOwnerAddress');
    navigate('/');
  };

  // Shorten address utility
  const shortenAddress = (address) => {
    if (!address) return 'Unknown';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format date utility
  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  // Loading state
  if (isDonationsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-lavender-500">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 to-lavender-500/10">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">House Owner Dashboard</h1>
          </div>
          <button 
            onClick={disconnect}
            className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-md transition-colors shadow-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Disconnect
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-sm">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {withdrawalSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            Funds successfully withdrawn to your wallet!
          </div>
        )}

        {donationsError && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            Error loading donations: {donationsError.message}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contract Balance</h2>
            <div className="text-3xl font-bold text-blue-600 mb-2">{contractBalance} ETH</div>
            <p className="text-sm text-gray-500 mb-4">Available to withdraw</p>
            
            <button
              onClick={withdrawFunds}
              disabled={isWithdrawing || parseFloat(contractBalance) === 0}
              className={`w-full py-2 px-4 rounded-md font-medium ${
                parseFloat(contractBalance) === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isWithdrawing ? 'Processing...' : 'Withdraw All Funds'}
            </button>
          </div>
          
          {/* Contract Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contract Details</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Contract Owner</p>
                <p className="text-md font-medium text-gray-800">{shortenAddress(ownerAddress)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Saved Wallet</p>
                <p className="text-md font-medium text-gray-800">
                  {shortenAddress(localStorage.getItem('houseOwnerAddress'))}
                </p>
              </div>
            </div>
          </div>
          
          {/* Donation Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Donation Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <p className="text-2xl font-bold text-gray-800">{donationHistory.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unique Donors</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(donationHistory.map(d => d.donor)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Donation History</h2>
          </div>
          
          <div className="overflow-x-auto">
            {donationHistory.length > 0 ? (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donationHistory.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {shortenAddress(donation.donor)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {parseFloat(donation.amount).toFixed(4)} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(donation.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${donation.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No donations found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HouseDashboard;