import { createContext, useContext, useState, useEffect } from 'react';
// Thirdweb imports commented out for demo mode
// import { useAddress, useDisconnect, useNetworth } from '@thirdweb-dev/react';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  // Use the specific wallet address instead of connecting to a real wallet
  const specificWalletAddress = "0xf355ef143B61A718367eC781CA2c788642F42bb0";
  
  // Comment out real wallet connection
  // const address = useAddress();
  // const disconnect = useDisconnect();
  
  // Use the specific wallet address
  const [address, setAddress] = useState(specificWalletAddress);
  const [balance, setBalance] = useState('0');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always authenticated for demo
  
  // Fetch balance from Ethereum (simulated)
  useEffect(() => {
    const fetchBalance = async () => {
      // In a real implementation, we would fetch the balance from an Ethereum provider
      // For now, we'll use a placeholder
      setBalance('1.25');
    };
    
    if (address) {
      fetchBalance();
    }
  }, [address]);
  
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