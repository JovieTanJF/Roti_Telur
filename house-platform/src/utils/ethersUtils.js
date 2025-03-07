import { ethers } from 'ethers';

/**
 * Convert wei to ETH with formatting
 * @param {string|number} wei - Wei amount to convert
 * @param {number} decimals - Number of decimals to display
 * @returns {string} Formatted ETH amount
 */
export const weiToEth = (wei, decimals = 4) => {
  if (!wei) return '0';
  try {
    const ethValue = ethers.utils.formatEther(wei.toString());
    return parseFloat(ethValue).toFixed(decimals);
  } catch (error) {
    console.error('Error converting wei to ETH:', error);
    return '0';
  }
};

/**
 * Format address to display shortened version
 * @param {string} address - Ethereum address
 * @returns {string} Shortened address
 */
export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Format timestamp to readable date
 * @param {number|string} timestamp - Unix timestamp
 * @returns {string} Formatted date
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleString();
};

/**
 * Get time ago string from timestamp
 * @param {number|string} timestamp - Unix timestamp
 * @returns {string} Time ago string
 */
export const timeAgo = (timestamp) => {
  if (!timestamp) return '';
  
  const seconds = Math.floor((new Date() - new Date(parseInt(timestamp) * 1000)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};