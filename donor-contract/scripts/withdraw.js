const { ethers } = require("hardhat");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

async function main() {
  // ✅ Read the deployed contract address
  const contractData = JSON.parse(fs.readFileSync("contract-address.json"));
  const contractAddress = contractData.address;

  // ✅ Set up provider & wallet (must be the owner)
  const provider = new ethers.JsonRpcProvider(process.env.API_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_CONTRACT_OWNER, provider);
  console.log(`🦊 Using Wallet: ${wallet.address}`);

  // ✅ Attach to the deployed contract
  const donation = await ethers.getContractAt("Donation", contractAddress);
  console.log(`🎯 Interacting with contract at: ${contractAddress}`);

  // ✅ Check contract owner
  const owner = await donation.owner();
  if (owner.toLowerCase() !== wallet.address.toLowerCase()) {
    console.error("🚨 Error: Only the contract owner can withdraw funds!");
    return;
  }
  console.log(`🎩 Contract Owner Verified: ${owner}`);

  // ✅ Check contract balance before withdrawal
  let contractBalance = await provider.getBalance(contractAddress);
  console.log(`💰 Contract Balance Before Withdrawal: ${ethers.formatEther(contractBalance)} ETH`);

  if (contractBalance == 0) {
    console.log("⚠️ No funds available to withdraw.");
    return;
  }

  // ✅ Execute withdrawal transaction
  try {
    console.log("💸 Withdrawing funds...");
    const tx = await donation.connect(wallet).withdrawFunds({
      gasLimit: 250000,
      gasPrice: ethers.parseUnits("5", "gwei"),
    });

    console.log("⏳ Waiting for transaction confirmation...");
    const receipt = await tx.wait();
    console.log(`✅ Withdrawal Successful!`);
    console.log(`🔗 Tx Hash: ${receipt.hash}`);

    // ✅ Check contract balance after withdrawal
    contractBalance = await provider.getBalance(contractAddress);
    console.log(`💰 Contract Balance After Withdrawal: ${ethers.formatEther(contractBalance)} ETH`);
  } catch (error) {
    console.error("🚨 Withdrawal Error:", error);
    return;
  }
}

// Execute script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
