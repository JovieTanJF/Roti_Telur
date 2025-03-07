// Utility functions for Ethereum operations

/**
 * Formats a transaction value from Wei to ETH with appropriate precision
 * @param {string|number} valueWei - The value in Wei
 * @param {number} precision - Number of decimal places (default: 6)
 * @returns {string} Formatted ETH value
 */
export const weiToEth = (valueWei, precision = 6) => {
    if (!valueWei) return '0 ETH';
    
    // Convert to number if string
    const value = typeof valueWei === 'string' ? parseFloat(valueWei) : valueWei;
    
    // Convert Wei to ETH (1 ETH = 10^18 Wei)
    const ethValue = value / 1e18;
    
    // Format with specified precision
    return `${ethValue.toFixed(precision)} ETH`;
  };
  
  /**
   * Formats a timestamp from seconds to a readable date string
   * @param {string|number} timestamp - Unix timestamp in seconds
   * @returns {string} Formatted date string
   */
  export const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    // Convert to number if string
    const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
    
    // Create Date object (multiply by 1000 to convert seconds to milliseconds)
    const date = new Date(ts * 1000);
    
    // Format the date
    return date.toLocaleString();
  };
  
  /**
   * Creates a block explorer URL for a transaction
   * @param {string} txHash - Transaction hash
   * @param {string} network - Network name (default: 'sepolia')
   * @returns {string} Block explorer URL
   */
  export const getExplorerUrl = (txHash, network = 'sepolia') => {
    if (!txHash) return '';
    
    const baseUrls = {
      mainnet: 'https://etherscan.io/tx/',
      sepolia: 'https://sepolia.etherscan.io/tx/',
      goerli: 'https://goerli.etherscan.io/tx/',
    };
    
    return `${baseUrls[network] || baseUrls.mainnet}${txHash}`;
  };
  
  /**
   * Shortens an Ethereum address for display
   * @param {string} address - Ethereum address
   * @param {number} prefixLength - Number of characters to show at the start (default: 6)
   * @param {number} suffixLength - Number of characters to show at the end (default: 4)
   * @returns {string} Shortened address
   */
  export const shortenAddress = (address, prefixLength = 6, suffixLength = 4) => {
    if (!address) return '';
    if (address.length < prefixLength + suffixLength) return address;
    
    return `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`;
  };