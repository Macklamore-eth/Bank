// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Test {
    mapping(address => uint256) public balances;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    function deposit() public payable {
        require(msg.value > 0, "No value sent.");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance.");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }
}
