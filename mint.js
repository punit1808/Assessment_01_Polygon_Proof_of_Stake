// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/NFTCollection.sol/NFTCollection.json");
require('dotenv').config()

const tokenAddress = "0x84FDF015166ADbb0f5dD9076Ca4EAC10B88532Df"; // place your erc721a contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xa22999C408285a3C5FbCb53e29c1365c213d68d7"; // place your public address for your wallet here

async function main() {

    const nftCollection = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    const ipfsURIs = [
      "ipfs://QmaotEfQe17oAJxGhmaNebhScTy86QvxB6XUZ3pkYLtqhD",
      "ipfs://QmVjthhZSWu9S4f4C4zd2nT7PycXaHKyKpj31UhRcJ4Rce",
      "ipfs://QmbbSWmvYwXrVb5P5TgPNQUHUUKsAC7HbYC4YFwRdaq3fy",
      "ipfs://QmPz1VcByRCQwDELUNQEcNG4qBpPan3LF2vAJPv6zRHbqn",
      "ipfs://QmfULmGSPcHZqEdJbPieqEp6n1bkE2KhfuwpXYzB24ofF4",
    ];

    const prompts = [
      "NFT1.png",
      "NFT2.png",
      "NFT3.png",
      "NFT4.png",
      "NFT5.png",
    ];

    for(let i = 0; i < ipfsURIs.length; i++) {
      const tx = await nftCollection.mintNFT(walletAddress, ipfsURIs[i], prompts[i]);
      await tx.wait();
      console.log(`Minted NFT ${i + 1} with URI: ${ipfsURIs[i]}`);
    }

  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
