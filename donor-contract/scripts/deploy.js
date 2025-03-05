const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const Donation = await ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();

  console.log(`✅ Contract deployed at: ${donation.target}`);

  // Save contract address for future use
  const contractData = {
    address: donation.target,
    network: "sepolia",
  };

  fs.writeFileSync("contract-address.json", JSON.stringify(contractData, null, 2));
  console.log("📄 Contract address saved to contract-address.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
