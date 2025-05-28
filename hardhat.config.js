require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.26",
  paths: {
    sources: "./blockchain/contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    vechain: {
      url: process.env.THOR_URL || "https://testnet.veblocks.net",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 39, // VeChain Thor chainId,
      gas: 10000000,
      gasPrice: 1000000000000000, // 1000 wei
    }
  }
};
