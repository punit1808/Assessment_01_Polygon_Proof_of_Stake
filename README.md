# MY ERC TOKEN
This project is to create our own ERC Token having functionalities of ERC20 token and can perform certain operations for Degen Token.

## Description

## Functionalities of DEGEN Token :
### Minting new tokens: The platform should be able to create new tokens and distribute them to players as rewards. Only the owner can mint tokens.
### Transferring tokens: Players should be able to transfer their tokens to others.
### Redeeming tokens: Players should be able to redeem their tokens for items in the in-game store.
### Checking token balance: Players should be able to check their token balance at any time.
### Burning tokens: Anyone should be able to burn tokens, that they own, that are no longer needed.

## Getting Started

For the execution of our code we will be using remixIDE ,
https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.25+commit.b61c2a91.js,
Snowtrace testnet.io : https://testnet.snowtrace.io/ ,
and VS-Code for Deployment.


After opening the remix IDE create a new .sol file and start writing the project code.

### Executing program

```
code blocks for commands

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2;

contract MY_ERC_Token {

    string public tokenName = "DEGEN";
    string public tokenSymbol = "DGN";
    uint private tokenSupply = 10000;
    address private Owner;

    mapping(address => uint) private balance_atAddress;
    mapping(address => uint) private redeemedItems_atAddress; // mapping for redeemed Items count
    mapping(address => string[]) private redeemedItemNames_atAddress; // mapping for redeemed Item names
    mapping(address => bool) private isExist;

    event Transfer(address indexed from, address indexed to, uint value);
    event Mint(address indexed to, uint value);
    event Burn(address indexed from, uint value);
    event ValidateAccount(address indexed account);
    event Redeem(address indexed from, uint value, string itemName);

    constructor(){
        Owner = msg.sender;
        balance_atAddress[Owner] += tokenSupply;
        isExist[Owner] = true;
    }

    modifier ownerAccess {
        require(Owner == msg.sender, "Only Owner can Access this Function.");
        _;
    }

    function validateAccount(address validAcc) public {
        isExist[validAcc] = true;
        emit ValidateAccount(validAcc); 
    }

    function mint(address mintAt, uint mintValue) public ownerAccess {
        balance_atAddress[mintAt] += mintValue;
        tokenSupply += mintValue;
        emit Mint(mintAt, mintValue);
    }

    function burn(address burnFrom) public {
        require(isExist[burnFrom], "Account doesn't exist.");
        uint burnAmount = balance_atAddress[burnFrom];
        tokenSupply -= burnAmount;
        balance_atAddress[burnFrom] = 0;
        emit Burn(burnFrom, burnAmount); 
    }

    function redeem(address redeemFrom, string memory itemName) public returns (uint) {
        uint redeemValue = 500;
        require(isExist[redeemFrom], "Account doesn't exist.");
        require(balance_atAddress[redeemFrom] >= redeemValue, "Insufficient Balance");

        tokenSupply -= redeemValue;
        balance_atAddress[redeemFrom] -= redeemValue;

        redeemedItems_atAddress[redeemFrom] += 1; // Increment redeemed items count
        redeemedItemNames_atAddress[redeemFrom].push(itemName); // Add redeemed item name
        emit Redeem(redeemFrom, redeemValue, itemName);
        return redeemedItems_atAddress[redeemFrom];  // Returning total redeemed items count
    }

    function getRedeemedItemNames(address account) public view returns (string[] memory) {
        require(isExist[account], "Account doesn't exist.");
        return redeemedItemNames_atAddress[account];
    }

    function totalSupply() public view returns (uint) {
        return tokenSupply;
    }

    function balanceOf(address checkAt) public view returns (uint) {
        require(isExist[checkAt], "Account doesn't exist.");
        return balance_atAddress[checkAt];
    }

    function transfer(address transferAt, uint transferValue) public {
        require(isExist[transferAt], "Receiver Account doesn't exist.");
        require(balance_atAddress[msg.sender] >= transferValue, "Insufficient Account Balance");
        
        balance_atAddress[msg.sender] -= transferValue;
        balance_atAddress[transferAt] += transferValue;
        emit Transfer(msg.sender, transferAt, transferValue); 
    }
}

```
Set Environment in remixIDE to Injected Provider Metamask,

After writing the code and setting up environment  it's time to compile it. So, press Ctrl + S to compile your code or click on Solidity comipler and then click on Compile project.sol . Now it's time to deploy click on deploy and run transction just below Solidity compiler and deploy . After deployment we can put values in mint and burn function to check if the code is working properly.

Also put deployed Address in testnet snowtrace.io and transactions will be reflected.


## For Better Understanding you can refer to Video Explaination.

### Thanks for Reading
I hope you Understand the program Code and functioning well.
## Have a Nice Day !!!
