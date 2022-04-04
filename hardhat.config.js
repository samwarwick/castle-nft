/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { ALCHEMY_RINKEBY_URL, ALCHEMY_ROPSTEN_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      rinkeby: {
         url: ALCHEMY_RINKEBY_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      ropsten: {
         url: ALCHEMY_ROPSTEN_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
