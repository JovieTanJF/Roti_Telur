import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useWallet } from '../context/WalletContext';
import { ethers } from 'ethers';
import { DONATIONS_QUERY, DONATION_BY_ID_QUERY } from '../graphql/client';

export const useTransactions = () => {
  const { address } = useWallet();
  const [formattedTransactions, setFormattedTransactions] = useState([]);
  
  // Use the specific address for querying if needed
  const walletAddress = address || '0xf355ef143B61A718367eC781CA2c788642F42bb0';
  
  // Use dummy data for now since we're having GraphQL issues
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setFormattedTransactions([
        {
          id: '0x1234567890abcdef1234567890abcdef12345678901234567890abcdef123456',
          donor: walletAddress,
          amount: '0.5 ETH',
          timestamp: new Date().toISOString(),
          status: 'Completed',
          confirmations: 12,
          gasUsed: '0.0001 ETH',
          recipientName: 'Save The Children',
          recipientAddress: '0x2345678901abcdef2345678901abcdef23456789',
        },
        {
          id: '0x2345678901abcdef2345678901abcdef23456789012345678901abcdef234567',
          donor: walletAddress,
          amount: '0.25 ETH',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'Completed',
          confirmations: 12,
          gasUsed: '0.0001 ETH',
          recipientName: 'Red Cross',
          recipientAddress: '0x3456789012abcdef3456789012abcdef34567890',
        },
        {
          id: '0x3456789012abcdef3456789012abcdef34567890123456789012abcdef345678',
          donor: walletAddress,
          amount: '0.1 ETH',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          status: 'Completed',
          confirmations: 12,
          gasUsed: '0.0001 ETH',
          recipientName: 'UNICEF',
          recipientAddress: '0x4567890123abcdef4567890123abcdef45678901',
        }
      ]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [walletAddress]);

  return {
    transactions: formattedTransactions,
    loading: false,
    error: null,
  };
};

export const useTransaction = (id) => {
  const [formattedTransaction, setFormattedTransaction] = useState(null);
  
  // Use dummy data for now
  useEffect(() => {
    if (id) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setFormattedTransaction({
          id: id,
          donor: '0xf355ef143B61A718367eC781CA2c788642F42bb0',
          amount: '0.5 ETH',
          timestamp: new Date().toISOString(),
          status: 'Completed',
          confirmations: 12,
          gasUsed: '0.0001 ETH',
          blockNumber: '12345678',
          recipientName: 'Save The Children',
          recipientAddress: '0x2345678901abcdef2345678901abcdef23456789',
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [id]);

  return {
    transaction: formattedTransaction,
    loading: !formattedTransaction && !!id,
    error: null,
  };
};