require('dotenv').config();
const API_URL = process.env.ALCHEMY_MUMBAI_URL;
//const API_URL = process.env.ALCHEMY_RINKEBY_URL;
//const API_URL = process.env.ALCHEMY_ROPSTEN_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const fetch = require('node-fetch');

const MUMBAI_CONTRACT = '0xECBc217b13dEA841c33b5b68c9c98041C2136205';
const RINKEBY_CONTRACT = '0x5c18191C30a1fECb95c77E6160FbfcbB3aE9e456';
const ROPSTEN_CONTRACT = '0x94d225df09E4C1B77b3e426DdAC710e5697e4D22';

const contract = require("../artifacts/contracts/CastleNFT.sol/CastleNFT.json");
const contractAddress = MUMBAI_CONTRACT;
//const contractAddress = RINKEBY_CONTRACT;
//const contractAddress = ROPSTEN_CONTRACT;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function getMetadataJson(url) {
    let json = null;
      
    try {
        json = await (await fetch(url)).json();
    } catch(err) {
    }

    return json;
}

async function getTokenDetails() {
    const networkType = await web3.eth.net.getNetworkType();
    console.log(`Network: ${networkType}`);
    console.log(`Contract: ${contractAddress}`);

    const name = await nftContract.methods.name().call();
    const symbol = await nftContract.methods.symbol().call();

    console.log(`NFT: ${name} (${symbol})`);

    const owner = await nftContract.methods.owner().call();
    console.log(`owner: ${owner}`);
    const ownerBalance = await nftContract.methods.balanceOf(owner).call();
    console.log(`owner balance: ${ownerBalance}`);

    let tokenURI;
    let metadata;
    let tokenOwner;
    let tokenId = 0;
    while(true) {
        if (tokenId++ >= 10) break;
        try {
            tokenURI = await nftContract.methods.tokenURI(tokenId).call();
        } catch(err) {
            console.log("No more tokens")
			break;
		}
        console.log(`TokenID: ${tokenId}`)
        console.log(`tokenURI: ${tokenURI}`);
        metadata = await getMetadataJson(tokenURI);
        if (metadata === null) {
            console.log('Invalid metadata');
        } else {
            console.log(`image url: ${metadata.image}`);
            tokenOwner = await nftContract.methods.ownerOf(tokenId).call();
            console.log(`owner: ${tokenOwner}`);
        }
    }
}

getTokenDetails();
