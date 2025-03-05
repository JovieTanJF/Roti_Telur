import { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
import { GET_DONATIONS } from '../graphql/queries';
import { useWallet } from '../context/WalletContext';
import { transactions, pendingTransactions } from '../utils/dummyData';

export const useTransactions = () => {
  const { address } = useWallet();
  const [allTransactions, setAllTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In a real app, we'd use this query
  /*
  const { data, loading, error } = useQuery(GET_DONATIONS, {
    variables: { donor: address },
    skip: !address,
  });
  */

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      try {
        // Combine transactions and pending transactions
        const combined = [...pendingTransactions, ...transactions];
        
        // Sort by timestamp (newest first)
        const sorted = combined.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        setAllTransactions(sorted);
        setLoading(false);
      } catch (err) {
        setError('Error loading transactions');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [address]);

  return {
    transactions: allTransactions,
    loading,
    error,
  };
};

export const useTransaction = (id) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      try {
        // Find the transaction in our dummy data
        const allTxs = [...transactions, ...pendingTransactions];
        const found = allTxs.find(tx => tx.id === id);
        
        if (found) {
          setTransaction(found);
        } else {
          setError('Transaction not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error loading transaction details');
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  return {
    transaction,
    loading,
    error,
  };
};