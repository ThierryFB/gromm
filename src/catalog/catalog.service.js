const { ethers } = require('ethers')
const ContractFactory = require('../utils/contract.factory')

// Initialize provider and signer
const getProviderAndSigner = () => {
  // Use THOR_URL for local testing, fallback to remote URLs for production
  const rpcUrl = process.env.THOR_URL || process.env.MAINNET_RPC_URL || process.env.TESTNET_RPC_URL || "https://rpc-testnet.vechain.energy/"
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  return { provider, signer }
}

const create = async ({ supplier, name }) => {
  try {
    const { provider, signer } = getProviderAndSigner()
    const contractFactory = new ContractFactory(provider, signer)
    
    const deployment = await contractFactory.deployCatalog(supplier.name, name)
    
    return {
      address: deployment.address,
      transactionHash: deployment.transactionHash
    }
  } catch (error) {
    console.error('Failed to create catalog contract:', error)
    throw error
  }
}

const getByAddress = async ({ address }) => {
  try {
    const { provider, signer } = getProviderAndSigner()
    const contractFactory = new ContractFactory(provider, signer)
    
    const catalogContract = await contractFactory.attachCatalog(address)
    
    return {
      address: catalogContract.address,
      name: await catalogContract.catalogName(),
      supplier: {
        name: await catalogContract.supplier()
      }
    }
  } catch (error) {
    console.error('Failed to get catalog by address:', error)
    throw error
  }
}

module.exports = {
  create,
  getByAddress
}
