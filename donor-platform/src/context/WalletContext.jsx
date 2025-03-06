import { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState('0');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Format the wallet address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const connectWallet = async () => {
    try {
      // For development, just use dummy data
      setAddress('0xf355ef143B61A718367eC781CA2c788642F42bb0');
      setBalance('1.25');
      setIsAuthenticated(true);
      return true;
      
      // Uncomment this for real wallet connection
      /*
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this feature');
        return false;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      const balanceWei = await provider.getBalance(addr);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      
      setAddress(addr);
      setBalance(parseFloat(balanceEth).toFixed(4));
      setIsAuthenticated(true);
      
      return true;
      */
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance('0');
    setIsAuthenticated(false);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        formatAddress,
        balance,
        disconnect,
        connectWallet,
        isAuthenticated,
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