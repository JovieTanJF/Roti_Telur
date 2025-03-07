// Script to test the donation queries against your subgraph
import { request, gql } from 'graphql-request';

// Your subgraph endpoint
const endpoint = 'https://api.studio.thegraph.com/query/105870/test-subgraph/version/latest';

// Wallet addresses from your transactions
const walletAddresses = [
  '0xf355ef143b61a718367ec781ca2c788642f42bb0', // First donor
  '0x9a51ccf518ddb347ca9acb7972adf5a120fe6594'  // Second donor
];

// Transaction hashes from your previous data
const transactionHashes = [
  '0x05e0b20bb723cadc16c082f988a30fef857745ce77b054494b8c28d8c49a3fab',
  '0x40006c074a448872414d422111aa473547493cf88b7823fa26c6c0e23865e199'
];

// Query to get donations for a specific wallet
const getWalletDonationsQuery = gql`
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

// Query to get a donation by transaction hash
const getDonationByTransactionQuery = gql`
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

// Utility function to convert wei to ETH
function weiToEth(wei) {
  return parseInt(wei) / 1e18;
}

// Format date from timestamp
function formatDate(timestamp) {
  return new Date(parseInt(timestamp) * 1000).toLocaleString();
}

// Test getting donations for each wallet
async function testWalletDonations() {
  console.log('\n===== TESTING WALLET DONATIONS =====');
  
  for (const address of walletAddresses) {
    try {
      console.log(`\nTesting wallet: ${address}`);
      
      const data = await request(endpoint, getWalletDonationsQuery, {
        address: address
      });
      
      if (data.donors && data.donors.length > 0) {
        const donor = data.donors[0];
        console.log(`Found donor:`);
        console.log(`- Address: ${donor.address}`);
        console.log(`- Total Donated: ${donor.totalDonated} wei (${weiToEth(donor.totalDonated)} ETH)`);
        console.log(`- Donation Count: ${donor.donationCount}`);
        
        if (donor.donations && donor.donations.length > 0) {
          console.log(`\nDonations for this wallet:`);
          donor.donations.forEach((donation, i) => {
            console.log(`\nDonation #${i+1}:`);
            console.log(`- ID: ${donation.id}`);
            console.log(`- Amount: ${donation.amount} wei (${weiToEth(donation.amount)} ETH)`);
            console.log(`- Time: ${formatDate(donation.timestamp)}`);
            console.log(`- Block: ${donation.blockNumber}`);
            console.log(`- Transaction: ${donation.transactionHash}`);
          });
        } else {
          console.log('No donations found for this donor');
        }
      } else {
        console.log(`No donor found with address: ${address}`);
      }
    } catch (error) {
      console.error(`Error querying wallet ${address}:`, error.message);
    }
  }
}

// Test getting donation by transaction hash
async function testTransactionDonations() {
  console.log('\n===== TESTING TRANSACTION DONATIONS =====');
  
  for (const txHash of transactionHashes) {
    try {
      console.log(`\nTesting transaction: ${txHash}`);
      
      const data = await request(endpoint, getDonationByTransactionQuery, {
        transactionHash: txHash
      });
      
      if (data.donations && data.donations.length > 0) {
        const donation = data.donations[0];
        console.log(`Found donation:`);
        console.log(`- ID: ${donation.id}`);
        console.log(`- Amount: ${donation.amount} wei (${weiToEth(donation.amount)} ETH)`);
        console.log(`- Time: ${formatDate(donation.timestamp)}`);
        console.log(`- Block: ${donation.blockNumber}`);
        console.log(`- Donor Address: ${donation.donor.address}`);
      } else {
        console.log(`No donation found for transaction: ${txHash}`);
      }
    } catch (error) {
      console.error(`Error querying transaction ${txHash}:`, error.message);
    }
  }
}

// Run the tests
async function runTests() {
  console.log('🧪 STARTING DONATION QUERY TESTS 🧪');
  console.log('===================================');
  console.log(`Testing subgraph at: ${endpoint}`);
  
  await testWalletDonations();
  await testTransactionDonations();
  
  console.log('\n===================================');
  console.log('🧪 TESTS COMPLETED 🧪');
}

// Execute the tests
runTests().catch(error => {
  console.error('\n❌ Error running tests:', error);
});