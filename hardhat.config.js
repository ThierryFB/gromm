require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "thor_local",
  paths: {
    sources: "./blockchain/contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    vechain_testnet: {
      url: process.env.TESTNET_RPC_URL || "https://rpc-testnet.vechain.energy/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 39,
      gasLimit: 8000000,
      gasPrice: 1000000000000,
    },
    vechain_mainnet: {
      url: process.env.MAINNET_RPC_URL || "https://rpc-mainnet.vechain.energy/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 100009,
      gasLimit: 8000000,
      gasPrice: 1000000000000,
    },
    // Local Thor solo node for testing
    thor_local: {
      url: process.env.THOR_URL || "http://thor:8669",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 100010, // Thor solo mode chain ID
      gasLimit: 8000000,
      gasPrice: 1000000000000,
    },
    // Legacy alias for backward compatibility
    vechain: {
      url: process.env.THOR_URL || "https://rpc-testnet.vechain.energy/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: process.env.CHAIN_ID && +process.env.CHAIN_ID || 100010, // Use solo chain ID by default
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPrice: 1
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    // Note: VeChain may not support etherscan verification
    // This is a placeholder for future compatibility
    apiKey: process.env.VECHAIN_API_KEY || ""
  }
};
