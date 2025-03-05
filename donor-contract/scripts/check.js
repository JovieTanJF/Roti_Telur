const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/BLLIkMFbCJlLzxRmwzDJdHowTEJck12r");
    const walletAddress = "0x9a51ccf518DDB347cA9ACb7972adf5a120Fe6594";

    const noncePending = await provider.getTransactionCount(walletAddress, "pending");
    const nonceLatest = await provider.getTransactionCount(walletAddress, "latest");

    console.log(`🔍 Latest Confirmed Nonce: ${nonceLatest}`);
    console.log(`🕒 Pending Nonce: ${noncePending}`);
}

main();
