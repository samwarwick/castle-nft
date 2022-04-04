const hre = require('hardhat');

async function main() {
    const CastleNFT = await ethers.getContractFactory('CastleNFT');
    const castleNFT = await CastleNFT.deploy()
    await castleNFT.deployed()
    console.log(`Castle NFT contract deployed to address ${castleNFT.address} on ${hre.network.name}`)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  