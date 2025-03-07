import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HouseLogin from './pages/HouseLogin';
import HouseDashboard from './pages/HouseDashboard';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('houseOwnerAddress');
  
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
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
  );
}

export default App;