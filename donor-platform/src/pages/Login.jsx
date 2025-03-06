import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Button from '../components/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';

const Login = () => {
  const { isAuthenticated, connectWallet, address, balance, formatAddress } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
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

  const handleConnect = async () => {
    setIsConnecting(true);
    await connectWallet();
    setIsConnecting(false);
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
                  
                  <Button 
                    onClick={handleConnect}
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