import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Button from '../components/Button';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';

// import { ConnectWallet } from '@thirdweb-dev/react'; // Commented out real wallet connection

const Login = () => {
  const { isAuthenticated } = useWallet();
  const navigate = useNavigate();

  // For demo purposes, add a simple login button that navigates to dashboard
  const handleDemoLogin = () => {
    navigate('/dashboard');
  };

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-purple to-lavender">
      <div className="px-4 sm:px-6 lg:px-8 py-12 w-full max-w-md mx-auto">
        <Card className="bg-white/90 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple">DonorChain</CardTitle>
            <CardDescription>Connect your wallet to make a difference</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="my-8 flex flex-col items-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-pink-lavender flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-purple" 
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
              
              <p className="text-gray-600 mb-8 text-center">
                Connect your Ethereum wallet to access the donation platform and start supporting causes you care about.
              </p>
              
              {/* Real wallet connection commented out */}
              {/* <ConnectWallet 
                className="!bg-purple hover:!bg-opacity-90 !text-white !py-3 !px-6 !rounded-radius-card !font-medium !transition-colors !flex !items-center !justify-center"
                dropdownPosition={{
                  side: "bottom",
                  align: "center",
                }}
              /> */}
              
              {/* Demo login button instead */}
              <Button 
                onClick={handleDemoLogin}
                size="lg"
                className="w-full"
              >
                Demo Login (Skip Wallet Connect)
              </Button>
              
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