require("dotenv").config();
const { ethers } = require("ethers");
const INFURA_KEY = process.env.INFURA_KEY;
const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
const NFT_Address = process.env.NFT_ADDRESS;
const contractABI = require("../artifacts/contracts/NFT.sol/MyNFT.json");

const provider = new ethers.providers.InfuraProvider("ropsten", INFURA_KEY);
const signer = new ethers.Wallet(METAMASK_PRIVATE_KEY, provider);

const nftContract = new ethers.Contract(NFT_Address, contractABI.abi, signer);

async function nftMint(tokenURI) {
  const nonce = await provider.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');

  const tx = {
    'from': METAMASK_PUBLIC_KEY,
    'to': NFT_Address,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.functions.mintNFT(METAMASK_PUBLIC_KEY, tokenURI)
  }

  const signedTransaction = signer.signTransaction(tx, METAMASK_PRIVATE_KEY)

  // const sentTx = await signer.sendTransaction(signedTransaction);
  // console.log(sentTx);
  signedTransaction
    .then((signedTx) => {
      provider.sendTransaction(
        signedTx,
        function (err, hash) {
          if(!err){
            console.log(
              "The hash of you transaction is: ",
              hash,
              "\nCheck Infura's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when executing the transaction:",
                err
              )
            }
          }
      )
    })
    .catch((err) =>{
      console.log("Promise failed:", err)
    })
  }

nftMint(
  "ipfs://QmZpBPUrkp1a8bTqo22FzHNwAYYNMUnfWVskRSVGq62W2B"
)