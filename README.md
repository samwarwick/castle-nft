# castle-nft
Experimental NFT collection

Loosely based on the Ethereum tutorial [How to write & deploy and NFT](https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/), with additional inspiration from https://github.com/schonken/blockchain-week-2022-nft-101.


## Stack

* [Alchemy](https://www.alchemy.com/) (including alchemy-web3)
* [Ethers](https://github.com/ethers-io/ethers.js)
* [Hardhat](https://hardhat.org/)
* [Pinata](https://app.pinata.cloud/)


## Instructions

1. Upload [images](images) to Pinata (or use your own).
2. Edit the [metadata](metadata) json files and change the `image` urls to the address created in step 1.
3. Create a `.env` file in the root of the project with entries for `ALCHEMY_RINKEBY_URL`, `ALCHEMY_ROPSTEN_URL` and `PRIVATE_KEY`.
4. Compile contract:
`npm run compile`
5. Deploy contract: 
`npm run deploy:rinkeby`
or 
`npm run deploy:ropsten`
6. Mint an NFT
`node scripts/mint <network> <nft-number>`
e.g.
`node scripts/mint ropsten 1`

