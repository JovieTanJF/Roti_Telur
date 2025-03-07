import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import Button from '../components/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';

const Login = () => {
  const { isAuthenticated, address, balance, formatAddress, setAddress, setBalance, setIsAuthenticated } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Wait a moment to show the user info before redirecting
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      
      // Create a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Get the balance
      const balanceWei = await provider.getBalance(userAddress);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      const formattedBalance = parseFloat(balanceEth).toFixed(4);
      
      // Update wallet context
      setAddress(userAddress);
      setBalance(formattedBalance);
      setIsAuthenticated(true);
      
      // Setup event listener for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setIsAuthenticated(false);
          setAddress('');
          setBalance('0');
        } else {
          // User switched accounts
          setAddress(accounts[0]);
          // Fetch new balance
          provider.getBalance(accounts[0]).then(balance => {
            setBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
          });
        }
      });
      
      // Setup event listener for chain changes
      window.ethereum.on('chainChanged', () => {
        // Refresh the page on chain change
        window.location.reload();
      });
      
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setError(err.message || 'Failed to connect to MetaMask');
      setIsAuthenticated(false);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="px-4 sm:px-6 lg:px-8 py-12 w-full max-w-md mx-auto">
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-500">DonorChain</CardTitle>
            <CardDescription>Connect your wallet to make a difference</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="my-8 flex flex-col items-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-purple-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
              </div>
              
              {isAuthenticated ? (
                <div className="text-center mb-6">
                  <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                    <p className="font-bold">Successfully connected!</p>
                    <p className="mt-2">Address: {formatAddress(address)}</p>
                    <p>Balance: {balance} ETH</p>
                  </div>
                  <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-8 text-center">
                    Connect your Ethereum wallet to access the donation platform and start supporting causes you care about.
                  </p>
                  
                  {error && (
                    <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                  </Button>
                </>
              )}
              
              <p className="mt-6 text-xs text-gray-500 text-center">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-white text-sm">
          <p>DonorChain &copy; 2025. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;