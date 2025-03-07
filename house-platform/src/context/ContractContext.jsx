import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractContext = createContext(null);

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractAddress] = useState("0xe455621A437ea29cb6a645ed9E4C73E94C233a99");
  const [contractABI] = useState([
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Donated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "donations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_donor",
          "type": "address"
        }
      ],
      "name": "getDonationAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        try {
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(ethersProvider);
          
          // Get signer if available
          try {
            const ethersSigner = ethersProvider.getSigner();
            const address = await ethersSigner.getAddress();
            setSigner(ethersSigner);
          } catch (error) {
            console.log("No signer available yet");
          }
          
          // Initialize contract
          const contractInstance = new ethers.Contract(
            contractAddress,
            contractABI,
            ethersProvider
          );
          setContract(contractInstance);
        } catch (error) {
          console.error("Failed to initialize provider:", error);
        }
      }
    };
    
    initializeProvider();
    
    // Handle account change
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, [contractAddress, contractABI]);

  const getSignedContract = async () => {
    if (!contract || !window.ethereum) return null;
    
    try {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      await ethersProvider.send("eth_requestAccounts", []);
      const ethersSigner = ethersProvider.getSigner();
      return contract.connect(ethersSigner);
    } catch (error) {
      console.error("Failed to get signed contract:", error);
      return null;
    }
  };

  return (
    <ContractContext.Provider
      value={{
        contract,
        provider,
        signer,
        contractAddress,
        getSignedContract
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};