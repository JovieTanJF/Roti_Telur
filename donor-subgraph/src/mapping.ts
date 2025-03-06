import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Donated } from "../generated/DonationContract/Donation";
import { Donor, Donation } from "../generated/schema";

export function handleDonation(event: Donated): void {
  // Get or create donor entity
  let donorId = event.params.donor.toHexString();
  let donor = Donor.load(donorId);
  
  if (!donor) {
    donor = new Donor(donorId);
    donor.address = event.params.donor;
    donor.totalDonated = BigInt.fromI32(0);
    donor.donationCount = BigInt.fromI32(0);
  }
  
  // Update donor stats
  donor.totalDonated = donor.totalDonated.plus(event.params.amount);
  donor.donationCount = donor.donationCount.plus(BigInt.fromI32(1));
  donor.save();
  
  // Create donation entity
  let donationId = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  let donation = new Donation(donationId);
  donation.donor = donorId;
  donation.amount = event.params.amount;
  donation.timestamp = event.block.timestamp;
  donation.blockNumber = event.block.number;
  donation.transactionHash = event.transaction.hash;
  donation.save();
}