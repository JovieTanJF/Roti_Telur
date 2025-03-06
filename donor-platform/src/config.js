const config = {
    // API endpoints
    apiEndpoint: 'https://api.studio.thegraph.com/query',
    graphqlEndpoint: 'https://api.studio.thegraph.com/query/105870/test-subgraph/version/latest',
    
    // Blockchain explorer URLs
    etherscanUrl: 'https://sepolia.etherscan.io',
    
    // Smart contract addresses
    donationContractAddress: '0xe455621A437ea29cb6a645ed9E4C73E94C233a99',
    
    // Application settings
    appName: 'DonorChain',
    supportEmail: 'support@donorchain.example',
    
    // Default transaction settings
    defaultGasLimit: 150000,
    minDonationAmount: 0.001, // in ETH
  };
  
  export default config;