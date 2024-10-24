# castle-nft

Experimental NFT collection.

Currently supports Ethereum and Polygon testnets.

Loosely based on the Ethereum tutorial [How to write & deploy an NFT](https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/), with additional inspiration from https://github.com/schonken/blockchain-week-2022-nft-101.

## Stack

-   [Alchemy](https://www.alchemy.com/) (including alchemy-web3)
-   [Ethers](https://github.com/ethers-io/ethers.js)
-   [Hardhat](https://hardhat.org/)
-   [Node](https://nodejs.org/en/blog/release/v16.15.1) 16
-   [Pinata](https://app.pinata.cloud/)
-   [Solidity](https://soliditylang.org/)

## Instructions

1. Upload [images](images) to Pinata (or use your own).
2. Edit the [metadata](metadata) json files and change the `image` urls to the address created in step 1.
3. Create a `.env` file in the root of the project with entries for `ALCHEMY_AMOY_URL`, `ALCHEMY_SEPOLIA_URL` and `PRIVATE_KEY`.
4. Compile [CastleNFT](contracts/CastleNFT.sol) contract:
   `npm run compile`
5. Deploy contract:
   `npm run deploy:<network>`
   Where network can be sepolia (Etherium testnet) or amoy (Polygon testnet).
   e.g.
   `npm run deploy:sepolia`
6. Update the `<network>_CONTRACT` constant in [mint.js](scripts/mint.js) with the contract address from step 5.
7. Mint an NFT
   `node scripts/mint <network> <nft-number>`
   e.g.
   `node scripts/mint sepolia 1`
