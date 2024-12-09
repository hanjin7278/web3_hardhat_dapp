require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config()

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat:{
      chainId: 1337,
    }
  }
};
