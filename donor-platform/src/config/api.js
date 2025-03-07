// TheGraph API configuration
export const graphApiConfig = {
    // Use the deployment ID instead of Studio ID for more reliable connection
    endpoint: 'https://api.studio.thegraph.com/subgraphs/id/QmbKxWHJkKAvguXPgkXM85JBB7A5BcMejexMrxbs3GbnUP',
    
    // Alternative endpoints in case the above doesn't work
    alternativeEndpoints: {
      // Using studio slug
      byName: 'https://api.studio.thegraph.com/query/YOUR_STUDIO_ID/test-subgraph/version/latest',
      
      // Using public endpoint if available
      public: 'https://api.thegraph.com/subgraphs/name/YOUR_GITHUB_USERNAME/test-subgraph',
    },
    
    // Network settings
    network: 'sepolia',
    
    // Block explorer settings (for linking to transactions)
    blockExplorer: {
      baseUrl: 'https://sepolia.etherscan.io',
      tx: 'https://sepolia.etherscan.io/tx/',
      address: 'https://sepolia.etherscan.io/address/',
      block: 'https://sepolia.etherscan.io/block/',
    },
  };
  
  // Update this function based on the actual data format from your subgraph
  export const formatTransactionFromSubgraph = (tx) => {
    if (!tx) return null;
    
    return {
      id: tx.id,
      donor: tx.from,
      recipient: tx.to,
      recipientName: `${tx.to.substring(0, 6)}...${tx.to.substring(tx.to.length - 4)}`, // Placeholder name
      amount: parseFloat(tx.value) / 1e18, // Convert from Wei to ETH
      timestamp: new Date(parseInt(tx.timestamp) * 1000).toISOString(),
      status: 'Completed', // Assuming all indexed transactions are completed
      gasUsed: parseFloat(tx.gasUsed) * parseFloat(tx.gasPrice) / 1e18, // Convert to ETH
      confirmations: tx.blockNumber ? parseInt(tx.blockNumber) : 0,
      estimatedTime: 'Completed',
    };
  };