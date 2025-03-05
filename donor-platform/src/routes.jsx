import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import TransactionDetail from './pages/TransactionDetail';
import Recipients from './pages/Recipients';
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/wallet',
    element: (
      <ProtectedRoute>
        <Wallet />
      </ProtectedRoute>
    ),
  },
  {
    path: '/transaction/:id',
    element: (
      <ProtectedRoute>
        <TransactionDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/recipients',
    element: (
      <ProtectedRoute>
        <Recipients />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export default routes;