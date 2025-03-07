import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { 
  GET_WALLET_DONATIONS, 
  GET_DONATION_BY_TRANSACTION, 
  GET_DONATION_BY_ID 
} from '../graphql/queries';
import { weiToEth, formatTimestamp, shortenAddress } from '../utils/ethereumUtils';

/**
 * Custom hook to fetch and process donation data from TheGraph
 * @param {string} walletAddress - The wallet address to fetch donations for
 * @returns {Object} The donations data, loading state, and error if any
 */
export const useDonations = (walletAddress) => {
  const [formattedDonations, setFormattedDonations] = useState([]);
  const [queryError, setQueryError] = useState(null);
  
  // Make sure walletAddress is lowercase for proper matching
  const lowerCaseAddress = walletAddress?.toLowerCase();
  
  // Use Apollo Client to query TheGraph
  const { data, loading, error } = useQuery(GET_WALLET_DONATIONS, {
    variables: { address: lowerCaseAddress },
    skip: !walletAddress,
    fetchPolicy: 'network-only', // Don't use cache
    errorPolicy: 'all', // Return all errors
    onError: (error) => {
      console.error("GraphQL error:", error);
      // Check for specific error types
      if (error.networkError) {
        setQueryError(`Network error: ${error.networkError.message}`);
      } else if (error.graphQLErrors) {
        setQueryError(`GraphQL error: ${error.graphQLErrors.map(e => e.message).join(', ')}`);
      } else {
        setQueryError(`Error: ${error.message}`);
      }
    }
  });

  // Process the data when it's received
  useEffect(() => {
    if (data && data.donors && data.donors.length > 0) {
      console.log("Received donor data:", data.donors[0]);
      
      const donor = data.donors[0]; // Should only have one donor per address
      
      if (donor.donations && donor.donations.length > 0) {
        const processed = donor.donations.map(donation => ({
          id: donation.id,
          donor: donor.address,
          amount: weiToEth(donation.amount),
          timestamp: new Date(parseInt(donation.timestamp) * 1000).toISOString(),
          status: 'Completed', // Assuming all indexed donations are completed
          blockNumber: donation.blockNumber,
          transactionHash: donation.transactionHash,
          // These fields aren't in your schema, but included for UI compatibility
          recipient: "Donation Contract",
          recipientName: "Donation Contract",
          estimatedTime: 'Completed',
          confirmations: 'Confirmed',
        }));
        
        // Sort by timestamp, most recent first
        processed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setFormattedDonations(processed);
      } else {
        console.warn("No donations found for this donor");
        setFormattedDonations([]);
      }
    } else {
      console.warn("No donor data found in the response");
      setFormattedDonations([]);
    }
  }, [data]);

  // Handle loading state change
  useEffect(() => {
    if (!loading && !error && !data) {
      console.warn(`No data returned for wallet: ${walletAddress}`);
    }
  }, [loading, error, data, walletAddress]);

  return {
    donations: formattedDonations,
    transactions: formattedDonations, // For backward compatibility
    loading,
    error: queryError || (error ? error.message : null),
    donorData: data?.donors?.[0] || null,
  };
};

/**
 * Hook to get a single donation by its transaction hash
 * @param {string} txHash - The transaction hash
 * @returns {Object} The donation data, loading state, and error if any
 */
export const useDonationByTransaction = (txHash) => {
  const [donation, setDonation] = useState(null);
  const [queryError, setQueryError] = useState(null);
  
  // Format the transaction hash - remove any suffix after a dash and ensure proper format
  const formatTransactionHash = (hash) => {
    if (!hash) return null;
    
    // Remove any suffix after a dash (like -16)
    let cleanHash = hash.split('-')[0];
    
    // Ensure it starts with 0x
    cleanHash = cleanHash.startsWith('0x') ? cleanHash : `0x${cleanHash}`;
    
    // Ensure even number of digits (excluding 0x)
    if ((cleanHash.length - 2) % 2 !== 0) {
      cleanHash = `0x0${cleanHash.substring(2)}`;
    }
    
    return cleanHash.toLowerCase();
  };
  
  const formattedTxHash = formatTransactionHash(txHash);

  const { data, loading, error } = useQuery(GET_DONATION_BY_TRANSACTION, {
    variables: { transactionHash: formattedTxHash },
    skip: !formattedTxHash,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onError: (error) => {
      console.error("GraphQL error in donation detail:", error);
      if (error.networkError) {
        setQueryError(`Network error: ${error.networkError.message}`);
      } else if (error.graphQLErrors) {
        setQueryError(`GraphQL error: ${error.graphQLErrors.map(e => e.message).join(', ')}`);
      } else {
        setQueryError(`Error: ${error.message}`);
      }
    }
  });
  
  // Process the data when it's received
  useEffect(() => {
    if (data && data.donations && data.donations.length > 0) {
      console.log("Received donation data:", data.donations[0]);
      
      const donationData = data.donations[0];
      const processedDonation = {
        id: donationData.id,
        donor: donationData.donor.address,
        amount: weiToEth(donationData.amount),
        timestamp: new Date(parseInt(donationData.timestamp) * 1000).toISOString(),
        status: 'Completed', // Assuming all indexed donations are completed
        blockNumber: donationData.blockNumber,
        transactionHash: donationData.transactionHash,
        // These fields aren't in your schema, but included for UI compatibility
        recipient: "Donation Contract",
        recipientName: "Donation Contract",
        estimatedTime: 'Completed',
        confirmations: parseInt(donationData.blockNumber) || 0,
      };
      
      setDonation(processedDonation);
    } else if (data && (!data.donations || data.donations.length === 0)) {
      setQueryError(`Donation not found for transaction: ${txHash}`);
    }
  }, [data, txHash]);

  return {
    donation,
    transaction: donation, // For backward compatibility
    loading,
    error: queryError || (error ? error.message : null),
  };
};

const formatTransactionHash = (hash) => {
  if (!hash) return null;
  
  // Ensure it starts with 0x
  let formatted = hash.startsWith('0x') ? hash : `0x${hash}`;
  
  // Ensure it has an even number of digits after 0x
  if ((formatted.length - 2) % 2 !== 0) {
    formatted = `0x0${formatted.substring(2)}`;
  }
  
  return formatted.toLowerCase();
};

/**
 * Hook to get a single donation by its ID
 * @param {string} id - The donation ID
 * @returns {Object} The donation data, loading state, and error if any
 */
export const useDonationById = (id) => {
  const [donation, setDonation] = useState(null);
  const [queryError, setQueryError] = useState(null);
  
  // Use Apollo Client to query TheGraph
  const { data, loading, error } = useQuery(GET_DONATION_BY_TRANSACTION, {
    variables: { transactionHash: formatTransactionHash(txHash) },
    skip: !txHash,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    onError: (error) => {
      console.error("GraphQL error in donation detail:", error);
      setQueryError(error.message);
    }
  });

  // Process the data when it's received
  useEffect(() => {
    if (data && data.donation) {
      console.log("Received donation data by ID:", data.donation);
      
      const donationData = data.donation;
      const processedDonation = {
        id: donationData.id,
        donor: donationData.donor.address,
        amount: weiToEth(donationData.amount),
        timestamp: new Date(parseInt(donationData.timestamp) * 1000).toISOString(),
        status: 'Completed',
        blockNumber: donationData.blockNumber,
        transactionHash: donationData.transactionHash,
        recipient: "Donation Contract",
        recipientName: "Donation Contract",
        estimatedTime: 'Completed',
        confirmations: parseInt(donationData.blockNumber) || 0,
      };
      
      setDonation(processedDonation);
    } else if (data && !data.donation) {
      setQueryError(`Donation not found with ID: ${id}`);
    }
  }, [data, id]);

  return {
    donation,
    transaction: donation, // For backward compatibility
    loading,
    error: queryError || (error ? error.message : null),
  };
};

// Backward compatibility exports
export const useRealTransactions = useDonations;
export const useRealTransaction = useDonationByTransaction;