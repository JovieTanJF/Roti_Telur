const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation Contract", function () {
  let Donation, donation;
  let owner, donor1, donor2;
  let contractAddress;

  beforeEach(async function () {
    // Get test accounts from Hardhat
    [owner, donor1, donor2] = await ethers.getSigners();

    // Deploy contract
    Donation = await ethers.getContractFactory("Donation");
    donation = await Donation.deploy();
    await donation.waitForDeployment();

    contractAddress = await donation.getAddress();
    console.log(`Contract deployed at: ${contractAddress}`);
  });

  it("Should set the correct owner", async function () {
    expect(await donation.owner()).to.equal(owner.address);
  });

  it("Should accept ETH donations", async function () {
    const donationAmount = ethers.parseEther("1.0");

    await expect(
      donation.connect(donor1).donate({ value: donationAmount })
    ).to.changeEtherBalances([donor1, donation], [-donationAmount, donationAmount]);

    expect(await donation.getDonationAmount(donor1.address)).to.equal(donationAmount);
  });

  it("Should track multiple donors' donations correctly", async function () {
    const amount1 = ethers.parseEther("0.5");
    const amount2 = ethers.parseEther("1.2");

    await donation.connect(donor1).donate({ value: amount1 });
    await donation.connect(donor2).donate({ value: amount2 });

    expect(await donation.getDonationAmount(donor1.address)).to.equal(amount1);
    expect(await donation.getDonationAmount(donor2.address)).to.equal(amount2);
  });

  it("Should emit Donated event on donation", async function () {
    const donationAmount = ethers.parseEther("0.3");

    await expect(donation.connect(donor1).donate({ value: donationAmount }))
      .to.emit(donation, "Donated")
      .withArgs(donor1.address, donationAmount);
  });

  it("Should allow only the owner to withdraw funds", async function () {
    const donationAmount = ethers.parseEther("2.0");
    await donation.connect(donor1).donate({ value: donationAmount });

    // Attempt withdrawal by non-owner should fail
    await expect(donation.connect(donor1).withdrawFunds()).to.be.revertedWith(
      "Only owner can withdraw"
    );

    // Owner withdraws successfully
    await expect(() =>
      donation.connect(owner).withdrawFunds()
    ).to.changeEtherBalances([owner, donation], [donationAmount, -donationAmount]);
  });

  it("Should withdraw all contract balance to owner", async function () {
    const amount1 = ethers.parseEther("1.5");
    const amount2 = ethers.parseEther("2.0");

    await donation.connect(donor1).donate({ value: amount1 });
    await donation.connect(donor2).donate({ value: amount2 });

    const contractBalance = await ethers.provider.getBalance(contractAddress);
    expect(contractBalance).to.equal(amount1 + amount2);

    // Withdraw all funds to the owner
    await expect(() =>
      donation.connect(owner).withdrawFunds()
    ).to.changeEtherBalances([owner, donation], [contractBalance, -contractBalance]);

    expect(await ethers.provider.getBalance(contractAddress)).to.equal(0);
  });
});
