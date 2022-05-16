require("dotenv").config();
const { ethers } = require("ethers");
const web3Provider = process.env.INFURA;
const Metamask_Public_Key = process.env.Metamask_Public_Key;
const Metamask_Private_Key = process.env.Metamask_Private_Key;
const NFT_Contract_Address = process.env.MyNFT_Address;
const contractABI = require("../artifacts/contracts/NFT.sol/MyNFT.json");

const provider = new ethers.providers.Web3Provider(web3Provider);
const nftContract = new ethers.Contract(contractABI, NFT_Contract_Address);
const signer = provider.getSigner()


async function nftMint(tokenURI) {
  const nonce = await provider.getTransactionCount(Metamask_Public_Key, 'latest');

  const tx = {
    'from': Metamask_Public_Key,
    'to': MyNFT_Address,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  }

  const signPromiseTransaction = await signer.signTransaction(tx, Metamask_Private_Key)

  // const signPromiseTransacton
  // .then((signedTx) => {})
}
