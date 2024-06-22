# NFTCollection
This project is to create our own 5 NFT's and deploy them on sepolia testnet and then map it to amoy testnet using FxPortal Bridge.

## Description

### Minting new NFT's : We will be minting NFT's to sepolia testnet using infura.
### Approve and Deposit NFT's : Then we will approve and deposit our NFT's to fxERC71RootAddress which is verified and published it will deposit our NFT's on amoy testnet network.
### getBalance : By this will check if NFT's are present on amoy network or not.
### promptDescription : It will returns the prompt we used to generate the images.

## Getting Started

For the execution of our code we will be using VS code ,
https://code.visualstudio.com/,
Etherscan testnet : https://sepolia.etherscan.io/ ,
Polyscan testnet : https://amoy.polygonscan.com/, and
Infura : https://www.infura.io/

### Executing program

```
code blocks for commands

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, Ownable {
    uint256 public tokenCounter;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) private _prompts;

    constructor() ERC721("NFTCollection", "NFTC") {
        tokenCounter = 0;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function promptDescription(uint256 tokenId) public view returns (string memory) {
        return _prompts[tokenId];
    }

    function mintNFT(address recipient, string memory uri, string memory prompt) public onlyOwner {
        uint256 newItemId = tokenCounter;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);
        _prompts[newItemId] = prompt;
        tokenCounter += 1;
    }
}

```
Firstly, we have to deploy our contract to get tokenAddress, command -> npx hardhat run scripts/deploy.js --network sepolia ,
then we will paste the tokenaddress in mint.js and approveDeposit.js after that we will first mint NFT's and then approve and deposit them After that we can see our NFT's on amoy testnet after 20-30 minutes.

## For Better Understanding you can refer to Video Explaination.

### Thanks for Reading
I hope you Understand the program Code and functioning well.
## Have a Nice Day !!!
