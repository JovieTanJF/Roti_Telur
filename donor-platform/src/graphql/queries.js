// import { gql } from "@apollo/client";

// Since we're in demo mode, we'll define query objects without using Apollo
export const GET_DONATIONS = {
  query: `
    query GetDonations($donor: String!) {
      donations(where: { donor: $donor }) {
        id
        donor
        recipient
        recipientName
        amount
        timestamp
        status
        gasUsed
        confirmations
      }
    }
  `
};

export const GET_DONATION_BY_ID = {
  query: `
    query GetDonationById($id: ID!) {
      donation(id: $id) {
        id
        donor
        recipient
        recipientName
        amount
        timestamp
        status
        gasUsed
        confirmations
        estimatedTime
      }
    }
  `
};

export const GET_ORGANIZATIONS = {
  query: `
    query GetOrganizations {
      organizations {
        id
        name
        address
        description
        totalDonations
        category
        logo
      }
    }
  `
};

export const GET_TOP_DONORS = {
  query: `
    query GetTopDonors {
      donors(orderBy: totalDonated, orderDirection: desc, first: 5) {
        address
        totalDonated
        donationCount
      }
    }
  `
};

export const GET_RECENT_UPDATES = {
  query: `
    query GetRecentUpdates {
      updates(orderBy: timestamp, orderDirection: desc, first: 4) {
        id
        title
        description
        timestamp
      }
    }
  `
};

// When switching back to Apollo, convert these to gql queries
/*
export const GET_DONATIONS = gql`
  query GetDonations($donor: String!) {
    donations(where: { donor: $donor }) {
      id
      donor
      recipient
      recipientName
      amount
      timestamp
      status
      gasUsed
      confirmations
    }
  }
`;

// ... and so on for the other queries
*/