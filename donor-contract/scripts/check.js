const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/BLLIkMFbCJlLzxRmwzDJdHowTEJck12r");
    const walletAddress = "0xf355ef143B61A718367eC781CA2c788642F42bb0";

    const noncePending = await provider.getTransactionCount(walletAddress, "pending");
    const nonceLatest = await provider.getTransactionCount(walletAddress, "latest");

    console.log(`🔍 Latest Confirmed Nonce: ${nonceLatest}`);
    console.log(`🕒 Pending Nonce: ${noncePending}`);
}

main();
