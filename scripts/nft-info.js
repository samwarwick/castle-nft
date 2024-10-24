require('dotenv').config();

//const API_URL = process.env.ALCHEMY_AMOY_URL;
const API_URL = process.env.ALCHEMY_SEPOLIA_URL;

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);
const fetch = require('node-fetch');

const AMOY_CONTRACT = '0xd6b1C9462d7dd02D23aDC31224962a7266cadeD8';
const SEPOLIA_CONTRACT = '0x0ed3F64BDdD661d52236C8d2290eC3884A0a6bDc';

const contract = require('../artifacts/contracts/CastleNFT.sol/CastleNFT.json');
//const contractAddress = AMOY_CONTRACT;
const contractAddress = SEPOLIA_CONTRACT;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function getMetadataJson(url) {
    let json = null;

    try {
        json = await (await fetch(url)).json();
    } catch (err) {}

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
    while (true) {
        if (tokenId++ >= 10) break;
        try {
            tokenURI = await nftContract.methods.tokenURI(tokenId).call();
        } catch (err) {
            console.log('No more tokens');
            break;
        }
        console.log(`TokenID: ${tokenId}`);
        console.log(`tokenURI: ${tokenURI}`);
        metadata = await getMetadataJson(tokenURI);
        if (metadata === null) {
            console.log('Invalid metadata');
        } else {
            console.log(metadata);
            console.log(`image url: ${metadata.image}`);
            tokenOwner = await nftContract.methods.ownerOf(tokenId).call();
            console.log(`owner: ${tokenOwner}`);
        }
    }
}

getTokenDetails();
