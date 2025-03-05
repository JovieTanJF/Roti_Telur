import { createContext, useContext, useState, useEffect } from 'react';
// import { useAddress, useDisconnect, useNetworth } from '@thirdweb-dev/react';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  // Comment out real wallet connection
  // const address = useAddress();
  // const disconnect = useDisconnect();
  
  // Use dummy data instead
  const [address, setAddress] = useState('0x1234567890abcdef1234567890abcdef12345678');
  const [balance, setBalance] = useState('1.25');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always authenticated for demo
  
  // Format the wallet address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // Dummy disconnect function
  const disconnect = () => {
    console.log('Disconnect clicked - this would normally disconnect your wallet');
    // We'll keep the user authenticated for the demo
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        formatAddress,
        balance,
        disconnect,
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