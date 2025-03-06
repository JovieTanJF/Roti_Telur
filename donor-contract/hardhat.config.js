require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

const { API_URL, PRIVATE_KEY_CONTRACT_OWNER, PRIVATE_KEY_PAY } = process.env;

module.exports = {
  solidity: "0.8.19", // Update this based on your contract
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/BLLIkMFbCJlLzxRmwzDJdHowTEJck12r",
      accounts: [`0x${PRIVATE_KEY_CONTRACT_OWNER}`]
    }
  },
};
