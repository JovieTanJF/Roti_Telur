// Simple script to test your subgraph
import { request, gql } from 'graphql-request';

// Your subgraph endpoint
const endpoint = 'https://api.studio.thegraph.com/query/105870/test-subgraph/version/latest';

// Create a simple query to get all data
const query = gql`
  {
    donors {
      id
      address
      totalDonated
      donationCount
    }
    donations {
      id
      amount
      donor {
        id
        address
      }
      timestamp
      blockNumber
      transactionHash
    }
  }
`;

// Function to run the query
async function runTest() {
  try {
    console.log('Testing subgraph at:', endpoint);
    
    // Make the request
    const data = await request(endpoint, query);
    
    // Print the results
    console.log('\n===== DONORS =====');
    console.log(`Found ${data.donors.length} donors:`);
    data.donors.forEach((donor, i) => {
      console.log(`\nDonor #${i+1}:`);
      console.log(`Address: ${donor.address}`);
      console.log(`Total Donated: ${donor.totalDonated} wei (${parseInt(donor.totalDonated)/1e18} ETH)`);
      console.log(`Donation Count: ${donor.donationCount}`);
    });
    
    console.log('\n===== DONATIONS =====');
    console.log(`Found ${data.donations.length} donations:`);
    data.donations.forEach((donation, i) => {
      console.log(`\nDonation #${i+1}:`);
      console.log(`Transaction: ${donation.transactionHash}`);
      console.log(`Amount: ${donation.amount} wei (${parseInt(donation.amount)/1e18} ETH)`);
      console.log(`From: ${donation.donor.address}`);
      console.log(`Block: ${donation.blockNumber}`);
      console.log(`Timestamp: ${new Date(parseInt(donation.timestamp) * 1000).toLocaleString()}`);
    });
    
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Error testing subgraph:', error);
  }
}

// Run the test
runTest();