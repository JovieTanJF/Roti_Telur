import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import TransactionDetail from './pages/TransactionDetail';
import Recipients from './pages/Recipients';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { useWallet } from './context/WalletContext';
import Layout from './components/Layout';

// Simple home page instead of login
const Home = () => {
  const { connectWallet, isAuthenticated } = useWallet();
  
  // This useEffect is missing in your Home component
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">DonorChain Platform</h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome to the blockchain donation platform
        </p>
        {isAuthenticated ? (
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
          >
            Go to Dashboard
          </button>
        ) : (
          <button 
            onClick={connectWallet} 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useWallet();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/recipients" element={
        <ProtectedRoute>
          <Recipients />
        </ProtectedRoute>
      } />
      <Route path="/wallet" element={
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      } />
      <Route path="/transaction/:id" element={
        <ProtectedRoute>
          <TransactionDetail />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};

export default Routes;