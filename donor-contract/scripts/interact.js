const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config(); // Ensure your .env file is loaded

async function main() {
  // ✅ Read saved contract address
  const contractData = JSON.parse(fs.readFileSync("contract-address.json"));
  const contractAddress = contractData.address;

  // ✅ Set up provider & wallet
  const provider = new ethers.JsonRpcProvider(process.env.API_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_PAY, provider);
  console.log(`🦊 Using Wallet: ${wallet.address}`);


  const walletAddress = wallet.address;
  const txCount = await provider.getTransactionCount(walletAddress);

  console.log(`Total Transactions Sent: ${txCount}`);

  // ✅ Attach to deployed contract
  const donation = await ethers.getContractAt("Donation", contractAddress);
  console.log(`🎯 Interacting with contract at: ${contractAddress}`);

  // ✅ Check contract owner
  const owner = await donation.owner();
  console.log(`🎩 Contract Owner: ${owner}`);

  // ✅ Check balance before donation
  let contractBalance = await provider.getBalance(contractAddress);
  console.log(`💰 Balance Before: ${ethers.formatEther(contractBalance)} ETH`);

  // ✅ Donation logic
  const donationAmount = ethers.parseEther("0.001");

  try {
    console.log(`💸 Donating ${ethers.formatEther(donationAmount)} ETH...`);
    const tx = await donation.connect(wallet).donate({
      value: donationAmount,
      gasLimit: 250000,
      gasPrice: ethers.parseUnits("5", "gwei"),
    });

    console.log(`⏳ Waiting for transaction confirmation...`);
    const receipt = await tx.wait();
    console.log(`✅ Donation Successful!`);
    console.log(`🔗 Tx Hash: ${receipt.hash}`);

    contractBalance = await provider.getBalance(contractAddress);
    console.log(`💰 Balance After: ${ethers.formatEther(contractBalance)} ETH`);
  } catch (error) {
    console.error("🚨 Donation Error:", error);
    return;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
