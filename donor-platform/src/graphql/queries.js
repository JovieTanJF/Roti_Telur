import { gql } from "@apollo/client";

export const GET_DONATIONS = gql`
  query GetDonations($donor: String) {
    donations(where: { donor: $donor }) {
      id
      transactionHash
      donor {
        address
      }
      recipient {
        address
        name
      }
      amount
      timestamp
      blockNumber
    }
  }
`;

export const GET_DONATION_BY_ID = gql`
  query GetDonationById($id: ID!) {
    donation(id: $id) {
      id
      transactionHash
      donor {
        address
      }
      recipient {
        address
        name
      }
      amount
      timestamp
      blockNumber
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
      address
      description
      totalReceived
      donationCount
    }
  }
`;

export const GET_TOP_DONORS = gql`
  query GetTopDonors {
    donors(orderBy: totalDonated, orderDirection: desc, first: 5) {
      id
      address
      totalDonated
      donationCount
    }
  }
`;