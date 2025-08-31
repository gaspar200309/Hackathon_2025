// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./Boleto3.sol";

contract Boleto3Sale {
    Boleto3 public token;
    uint256 public rate = 1000; // 1 ETH = 1000 BOL3

    constructor(address tokenAddress) {
        token = Boleto3(tokenAddress);
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Send ETH to buy tokens");
        uint256 tokensToBuy = msg.value * rate;
        token.mint(msg.sender, tokensToBuy);
    }
}
