const config = {
    // API endpoints
    apiEndpoint: 'https://api.example.com/v1',
    graphqlEndpoint: 'https://api.thegraph.com/subgraphs/name/yourdummysubgraph/donation-platform',
    
    // Blockchain explorer URLs
    etherscanUrl: 'https://etherscan.io',
    
    // Smart contract addresses
    donationContractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    
    // Application settings
    appName: 'DonorChain',
    supportEmail: 'support@donorchain.example',
    
    // Default transaction settings
    defaultGasLimit: 150000,
    minDonationAmount: 0.01, // in ETH
  };
  
  export default config;