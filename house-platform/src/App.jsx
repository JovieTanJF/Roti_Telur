import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ContractProvider } from './context/ContractContext';
import apolloClient from './config/apolloClient';
import HouseLogin from './pages/HouseLogin';
import HouseDashboard from './pages/HouseDashboard';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('houseOwnerAddress');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ContractProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HouseLogin />} />
            <Route 
              path="/house-dashboard" 
              element={
                <ProtectedRoute>
                  <HouseDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ContractProvider>
    </ApolloProvider>
  );
}

export default App;