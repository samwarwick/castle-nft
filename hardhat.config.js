/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
const { ALCHEMY_AMOY_URL, ALCHEMY_SEPOLIA_URL, PRIVATE_KEY } = process.env;
module.exports = {
    solidity: '0.8.1',
    defaultNetwork: 'sepolia',
    networks: {
        hardhat: {},
        amoy: {
            url: ALCHEMY_AMOY_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        sepolia: {
            url: ALCHEMY_SEPOLIA_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};
