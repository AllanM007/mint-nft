require("dotenv").config();
const { ethers } = require("ethers");
const { MyNFT_Address } = process.env;
const contractABI = require("../artifacts/contracts/NFT.sol/MyNFT.json")

async function main() {

    nftContract = new ethers.Contract(contractABI, MyNFT_Address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
