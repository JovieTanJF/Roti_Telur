import { Navigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Layout from './Layout';

const ProtectedRoute = ({ children }) => {
  // In demo mode, we don't need to check authentication
  // const { isAuthenticated } = useWallet();
  const isAuthenticated = true; // Always authenticated for demo

  // For demo, we'll skip the authentication check
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;