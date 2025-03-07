import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          // Check if user is already connected
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            // User is already connected
            const userAddress = accounts[0];
            
            // Create a provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            // Get the balance
            const balanceWei = await provider.getBalance(userAddress);
            const balanceEth = ethers.utils.formatEther(balanceWei);
            const formattedBalance = parseFloat(balanceEth).toFixed(4);
            
            // Update state
            setAddress(userAddress);
            setBalance(formattedBalance);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install MetaMask to continue.');
        return;
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
      
      // Update state
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
      
      return true;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect wallet: ' + (error.message || 'Unknown error'));
      return false;
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Format the wallet address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Disconnect function
  const disconnect = () => {
    setAddress('');
    setBalance('0');
    setIsAuthenticated(false);
    // Note: MetaMask doesn't support programmatic disconnection
    // This just clears the data in our app
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        formatAddress,
        balance,
        disconnect,
        isAuthenticated,
        connectWallet,
        isConnecting
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};