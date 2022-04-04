require('dotenv').config();

const ALCHEMY_RINKEBY_URL = process.env.ALCHEMY_RINKEBY_URL;
const ALCHEMY_ROPSTEN_URL = process.env.ALCHEMY_ROPSTEN_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const RINKEBY_CONTRACT = '0x5c18191C30a1fECb95c77E6160FbfcbB3aE9e456';
const ROPSTEN_CONTRACT = '0x94d225df09E4C1B77b3e426DdAC710e5697e4D22';

const BASE_URI = "https://gateway.pinata.cloud/ipfs/Qmdh88hxWq78idcGuKa5qLg3Dixpht86EFsHTTdrq7wAqo";
const NFT_IDS = [ "main", "sun", "night", "red-door", "white" ];

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contract = require("../artifacts/contracts/CastleNFT.sol/CastleNFT.json");

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  console.log(`nonce: ${nonce}`);

  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ", hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:", err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

const argv = process.argv.slice(2);
if (argv.length !== 2) {
    console.log('Usage: mint <network> <nft-number>');
    process.exit();
}

let web3;
let contractAddress;
if (argv[0] === 'ropsten') {
    web3 = createAlchemyWeb3(ALCHEMY_ROPSTEN_URL);
    contractAddress = ROPSTEN_CONTRACT; 
} else {
    web3 = createAlchemyWeb3(ALCHEMY_RINKEBY_URL);
    contractAddress = RINKEBY_CONTRACT; 
}

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const nft = NFT_IDS[argv[1] - 1];
console.log(`Minting ${nft} on ${argv[0]}`);
mintNFT(`${BASE_URI}/castle-${nft}.json`);
