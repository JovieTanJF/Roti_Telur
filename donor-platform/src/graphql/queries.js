import { gql } from '@apollo/client';

// Query to get all donations for a specific wallet address
export const GET_WALLET_DONATIONS = gql`
  query GetWalletDonations($address: Bytes!) {
    donors(where: { address: $address }) {
      id
      address
      totalDonated
      donationCount
      donations {
        id
        amount
        timestamp
        blockNumber
        transactionHash
      }
    }
  }
`;

// Query to get a specific donation by transaction hash
export const GET_DONATION_BY_TRANSACTION = gql`
  query GetDonationByTransaction($transactionHash: Bytes!) {
    donations(where: { transactionHash: $transactionHash }) {
      id
      amount
      timestamp
      blockNumber
      transactionHash
      donor {
        id
        address
      }
    }
  }
`;

// Query to get a specific donation by ID
export const GET_DONATION_BY_ID = gql`
  query GetDonationById($id: ID!) {
    donation(id: $id) {
      id
      amount
      timestamp
      blockNumber
      transactionHash
      donor {
        id
        address
      }
    }
  }
`;

// Optional: Query to get all donations (limited to most recent 100)
export const GET_ALL_DONATIONS = gql`
  query GetAllDonations {
    donations(first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      amount
      timestamp
      blockNumber
      transactionHash
      donor {
        id
        address
      }
    }
  }
`;