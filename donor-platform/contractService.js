import { ethers } from 'ethers';
import config from '../config';
import DonationABI from '../abis/Donation.json';

export const getContract = async (signer) => {
  try {
    const contract = new ethers.Contract(
      config.donationContractAddress,
      DonationABI,
      signer
    );
    return contract;
  } catch (error) {
    console.error('Error getting contract:', error);
    throw error;
  }
};

export const makeDonation = async (signer, amount) => {
  try {
    const contract = await getContract(signer);
    const tx = await contract.donate({
      value: ethers.utils.parseEther(amount.toString()),
      gasLimit: config.defaultGasLimit,
    });
    return await tx.wait();
  } catch (error) {
    console.error('Error making donation:', error);
    throw error;
  }
};

export const getDonationAmount = async (provider, address) => {
  try {
    const contract = new ethers.Contract(
      config.donationContractAddress,
      DonationABI,
      provider
    );
    const amount = await contract.getDonationAmount(address);
    return ethers.utils.formatEther(amount);
  } catch (error) {
    console.error('Error getting donation amount:', error);
    throw error;
  }
};