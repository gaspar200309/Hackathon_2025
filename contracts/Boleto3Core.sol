// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Boleto3Core is Ownable {
    IERC20 public token;

    struct Credential {
        bool isStudent;
        bool isSenior;
    }

    mapping(address => Credential) public credentials;
    mapping(address => uint256) public lastRewardClaim;

    event PaymentMade(address indexed user, address indexed driver, uint256 amount);
    event CredentialIssued(address indexed user, bool isStudent, bool isSenior);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _token, address _owner) Ownable(_owner) {
        token = IERC20(_token);
    }

    /// Registrar credencial verificable
    function issueCredential(address user, bool student, bool senior) external onlyOwner {
        credentials[user] = Credential(student, senior);
        emit CredentialIssued(user, student, senior);
    }

    /// Pagar pasaje (ejemplo: 1 BOL3 normal, 0.5 estudiantes, 0.2 tercera edad)
    function payRide(address driver) external {
        uint256 fare = 1e18; // tarifa base = 1 BOL3

        if (credentials[msg.sender].isStudent) {
            fare = 5e17; // 0.5 BOL3
        } else if (credentials[msg.sender].isSenior) {
            fare = 2e17; // 0.2 BOL3
        }

        require(token.transferFrom(msg.sender, driver, fare), "Pago fallido");
        emit PaymentMade(msg.sender, driver, fare);
    }

    /// Recompensas simples por uso (1 BOL3 cada 10 min)
    function claimReward() external {
        require(block.timestamp - lastRewardClaim[msg.sender] > 600, "Ya reclamaste");
        lastRewardClaim[msg.sender] = block.timestamp;

        require(token.transfer(msg.sender, 1e18), "Reward fallido");
        emit RewardClaimed(msg.sender, 1e18);
    }
}
