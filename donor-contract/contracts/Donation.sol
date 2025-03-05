// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Donation {
    address public owner;
    mapping(address => uint256) public donations;

    event Donated(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donations[msg.sender] += msg.value;
        emit Donated(msg.sender, msg.value);
    }

    function getDonationAmount(address _donor) public view returns (uint256) {
        return donations[_donor];
    }

    function withdrawFunds() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
